'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  CheckCircle,
  MessageSquare,
  Mail,
  User,
  Building,
  Calendar,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'comments', 'testimonials'
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const INITIAL_COMMENTS_LIMIT = 4;

  useEffect(() => {
    loadAllFeedback();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  async function loadAllFeedback() {
    try {
      const [commentsRes, contentRes] = await Promise.all([
        fetch('/api/comments?all=true'),
        fetch('/api/content'),
      ]);

      if (commentsRes.ok) {
        const json = await commentsRes.json();
        setComments(Array.isArray(json) ? json : []);
      }

      if (contentRes.ok) {
        const contentJson = await contentRes.json();
        setTestimonials(contentJson?.testimonials || []);
      }
    } catch (err) {
      console.error('Error fetching admin feedback data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleVisibility = async (comment) => {
    const newStatus = comment.status === 'Hidden' ? 'Approved' : 'Hidden';
    setActionLoading(comment.id);
    try {
      const res = await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: comment.id,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update visibility status');
      }

      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? { ...c, status: newStatus } : c))
      );
      showToast(
        `Comment is now ${newStatus === 'Approved' ? 'visible on live site' : 'hidden from public view'}.`
      );
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePromoteToTestimonial = async (comment) => {
    setActionLoading(comment.id);
    try {
      const res = await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: comment.id,
          action: 'promote',
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to promote comment');
      }

      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? { ...c, promoted: true } : c))
      );
      if (json.testimonial) {
        setTestimonials((prev) => [json.testimonial, ...prev]);
      }
      showToast('Comment connected and promoted to Featured Client Testimonials!');
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this comment?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/comments?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments((prev) => prev.filter((c) => c.id !== id));
      showToast('Comment deleted successfully.');
    } catch (err) {
      alert(err.message || 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  // Harmonized calculations
  const totalCount = comments.length + testimonials.length;
  const allRatings = [
    ...comments.map((c) => Number(c.rating) || 5),
    ...testimonials.map((t) => Number(t.rating) || 5),
  ];
  const avgRating =
    allRatings.length > 0
      ? (allRatings.reduce((acc, r) => acc + r, 0) / allRatings.length).toFixed(1)
      : '5.0';

  const ratingCounts = {
    5: allRatings.filter((r) => r === 5).length,
    4: allRatings.filter((r) => r === 4).length,
    3: allRatings.filter((r) => r === 3).length,
    2: allRatings.filter((r) => r === 2).length,
    1: allRatings.filter((r) => r === 1).length,
  };

  // Filtered comments
  const filteredComments = comments.filter((c) => {
    const matchesRating =
      filterRating === 'all' ? true : Number(c.rating) === Number(filterRating);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.name?.toLowerCase().includes(q) ||
      c.comment?.toLowerCase().includes(q) ||
      c.role?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q);

    return matchesRating && matchesSearch;
  });

  const visibleComments = showAllComments
    ? filteredComments
    : filteredComments.slice(0, INITIAL_COMMENTS_LIMIT);

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesRating =
      filterRating === 'all' ? true : Number(t.rating || 5) === Number(filterRating);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.clientName?.toLowerCase().includes(q) ||
      t.quote?.toLowerCase().includes(q) ||
      t.role?.toLowerCase().includes(q) ||
      t.restaurant?.toLowerCase().includes(q);
    return matchesRating && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-cyan-400 font-mono text-xs">
        CONNECTING RATINGS, COMMENTS & TESTIMONIALS...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-200 text-xs font-mono shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
            <span>Client Ratings, Comments & Testimonials</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Connected dashboard: Review user comments, manage star ratings, and promote feedback to featured testimonials.
          </p>
        </div>

        <Link
          href="/admin/content"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
        >
          <span>Edit Site Copy & Testimonials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Average Rating Block */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center text-amber-400">
            <span className="text-2xl font-black">{avgRating}</span>
            <div className="flex -mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Overall Score</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {Number(avgRating) >= 4.5 ? 'Exceptional Trust' : 'High Satisfaction'}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">
              Across {totalCount} total reviews & testimonials
            </div>
          </div>
        </div>

        {/* Rating Distribution Breakdown */}
        <div className="md:col-span-3 p-6 rounded-2xl bg-[#0E1626] border border-slate-800 flex flex-col justify-center">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>Harmonized Rating Distribution</span>
            <span>
              {testimonials.length} Testimonials • {comments.length} Comments
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

              return (
                <button
                  key={stars}
                  onClick={() =>
                    setFilterRating(filterRating === String(stars) ? 'all' : String(stars))
                  }
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    filterRating === String(stars)
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 font-bold text-xs sm:text-sm">
                    <span>{stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {count} ({percent}%)
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
          <button
            onClick={() => {
              setActiveTab('all');
              setShowAllComments(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Submissions ({totalCount})
          </button>
          <button
            onClick={() => {
              setActiveTab('comments');
              setShowAllComments(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'comments'
                ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>User Comments & Ratings ({comments.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('testimonials');
              setShowAllComments(false);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'testimonials'
                ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Featured Testimonials ({testimonials.length})</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1626] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client name, comment, restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          {/* Star Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs font-mono">
            <span className="text-slate-500 text-[11px] flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Stars:
            </span>
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                filterRating === 'all'
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setFilterRating(String(s))}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  filterRating === String(s)
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feedback List */}
      <div className="space-y-4">
        {/* If showing comments (tab 'all' or 'comments') */}
        {(activeTab === 'all' || activeTab === 'comments') &&
          visibleComments.map((c) => {
            const stars = Math.min(5, Math.max(1, Number(c.rating) || 5));
            const isHidden = c.status === 'Hidden';
            const isWorking = actionLoading === c.id;

            return (
              <div
                key={c.id}
                className={`p-6 rounded-2xl bg-[#0E1626] border transition-all space-y-4 ${
                  isHidden
                    ? 'border-slate-800/60 opacity-70 bg-slate-950/40'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm shadow shrink-0">
                      {(c.name || 'C').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{c.name}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                          Community Review
                        </span>
                        {c.promoted && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                            <span>Featured in Testimonials</span>
                          </span>
                        )}
                        {isHidden && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Hidden
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 font-mono flex flex-wrap items-center gap-3 mt-1">
                        {c.role && (
                          <span className="flex items-center gap-1 text-cyan-400">
                            <Building className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>{c.role}</span>
                          </span>
                        )}
                        {c.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                            <a href={`mailto:${c.email}`} className="hover:underline">
                              {c.email}
                            </a>
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleString('en-US', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })
                              : 'Recently'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30">
                      {[...Array(stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-mono font-bold text-amber-300">
                        {stars}.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment Body */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans">
                  &ldquo;{c.comment}&rdquo;
                </div>

                {/* Footer Controls: Connect to Testimonials */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="text-[11px] font-mono text-slate-500">
                    Comment ID: <span className="text-slate-400">{c.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Connect / Promote to Featured Testimonial */}
                    {!c.promoted ? (
                      <button
                        onClick={() => handlePromoteToTestimonial(c)}
                        disabled={isWorking}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-950/30 border border-amber-800/50 hover:bg-amber-900/40 hover:border-amber-500/60 transition-colors"
                        title="Connect and promote this comment to the flagship Client Testimonials section"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Feature in Testimonials</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Connected to Testimonials</span>
                      </span>
                    )}

                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleToggleVisibility(c)}
                      disabled={isWorking}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        isHidden
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/40'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-amber-300 hover:border-amber-500/40'
                      }`}
                      title={isHidden ? 'Make visible on public site' : 'Hide from public site'}
                    >
                      {isHidden ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show on Site</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide</span>
                        </>
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      disabled={isWorking}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/40 hover:bg-red-900/40 hover:border-red-500/60 transition-colors"
                      title="Permanently delete comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Show More / Show Less for Admin comments when exceeding limit */}
        {filteredComments.length > INITIAL_COMMENTS_LIMIT && (activeTab === 'all' || activeTab === 'comments') && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllComments((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-all cursor-pointer"
            >
              {showAllComments ? (
                <>
                  <span>Show Less Comments</span>
                  <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                </>
              ) : (
                <>
                  <span>
                    Show More Comments ({filteredComments.length - INITIAL_COMMENTS_LIMIT} more)
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                </>
              )}
            </button>
          </div>
        )}

        {/* If showing testimonials (tab 'all' or 'testimonials') */}
        {(activeTab === 'all' || activeTab === 'testimonials') &&
          filteredTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="p-6 rounded-2xl bg-[#0E1626] border border-amber-500/30 hover:border-amber-500/50 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow shrink-0">
                    {t.clientName ? t.clientName.charAt(0).toUpperCase() : 'T'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{t.clientName}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        <span>Curated Testimonial</span>
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-cyan-400">{t.role}</span>
                      <span>{t.restaurant}</span>
                      <span className="text-slate-500">{t.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 shrink-0">
                  {[...Array(Number(t.rating) || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-mono font-bold text-amber-300">
                    {t.rating || 5}.0
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans space-y-2">
                <p>&ldquo;{t.quote}&rdquo;</p>
                {t.translation && (
                  <p className="text-xs text-slate-400 italic pt-2 border-t border-slate-800">
                    &ldquo;{t.translation}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Managed in Site Content (company_portfolio.json)</span>
                <Link
                  href="/admin/content"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Edit in Content Admin</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}

        {filteredComments.length === 0 && filteredTestimonials.length === 0 && (
          <div className="p-16 text-center rounded-2xl bg-[#0E1626] border border-slate-800 space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No reviews or testimonials match</h3>
            <p className="text-xs text-slate-400 font-mono max-w-sm mx-auto">
              Try adjusting your search query or rating filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
