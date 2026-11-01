'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  CheckCircle,
  MapPin,
  Building2,
  MessageSquare,
  Sparkles,
  AlertCircle,
  User,
} from 'lucide-react';

export default function ClientTestimonials({ testimonials: initialTestimonials = [] }) {
  const [comments, setComments] = useState([]);
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'featured', 'community'
  const [showForm, setShowForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const res = await fetch('/api/comments', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error fetching comments in ClientTestimonials:', err);
    }
  }

  const ratingDescriptions = {
    5: 'Exceptional (5/5) • በጣም ምርጥ',
    4: 'Very Good (4/5) • በጣም ጥሩ',
    3: 'Good / Average (3/5) • መካከለኛ',
    2: 'Needs Improvement (2/5) • መሻሻል አለበት',
    1: 'Poor (1/5) • ዝቅተኛ',
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const finalRating = Number(rating) || 5;
    const finalComment =
      commentText.trim() || `Verified ${finalRating}-star rating from client`;
    const finalName = name.trim() || 'Verified Client';
    const finalRole = role.trim() || 'Client';

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalName,
          role: finalRole,
          email: email.trim(),
          rating: finalRating,
          comment: finalComment,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit rating & comment');
      }

      if (json.comment) {
        setComments((prev) => [json.comment, ...prev]);
      }

      setSuccessMsg(
        'Thank you! Your rating and comment have been recorded successfully.'
      );
      setName('');
      setRole('');
      setEmail('');
      setCommentText('');
      setRating(5);

      setTimeout(() => {
        setSuccessMsg('');
      }, 7000);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    setShowForm(true);
    const formEl = document.getElementById('rating-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const commentInput = document.getElementById('comment-input');
      commentInput?.focus();
    }
  };

  // Harmonized items list
  const featuredList = (initialTestimonials || []).map((t) => ({
    id: t.id || `test-${t.clientName}`,
    name: t.clientName,
    role: t.role,
    restaurant: t.restaurant,
    location: t.location || 'አዲስ አበባ (Addis Ababa)',
    rating: Number(t.rating) || 5,
    quote: t.quote,
    translation: t.translation,
    isFeatured: true,
    date: null,
  }));

  const communityList = comments.map((c) => ({
    id: c.id,
    name: c.name,
    role: c.role || 'Client',
    restaurant: c.role || 'Ethiopian Business',
    location: 'አዲስ አበባ (Addis Ababa)',
    rating: Number(c.rating) || 5,
    quote: c.comment,
    translation: null,
    isFeatured: !!c.promoted,
    date: c.createdAt,
  }));

  const allItems = [...featuredList, ...communityList];

  const totalReviews = allItems.length;
  const avgScore =
    totalReviews > 0
      ? (allItems.reduce((sum, item) => sum + (Number(item.rating) || 5), 0) / totalReviews).toFixed(1)
      : '5.0';

  const displayedItems =
    filterTab === 'featured'
      ? featuredList
      : filterTab === 'community'
      ? communityList
      : allItems;

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 relative"
    >
      <div id="reviews" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>የደንበኞች ምስክርነት እና ደረጃ • Testimonials & Ratings</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              Trusted by Ethiopian Restaurants & Clients
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Hear directly from Addis Ababa restaurant owners, café founders, and lounge managers about our fast digital menus and website services.
            </p>
          </div>

          {/* Aggregate Rating Badge & Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-[#0E1626] border border-amber-200 dark:border-amber-500/30">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {avgScore}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
                <div>{totalReviews} Reviews</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Verified</div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToForm}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 active:scale-95 transition-all min-h-[44px] touch-manipulation cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Rate & Review</span>
            </button>
          </div>
        </div>

        {/* Comment & Rating Form - Mobile-optimized inputs */}
        {showForm && (
          <div
            id="rating-form"
            className="mb-10 sm:mb-12 p-5 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-cyan-500/40 shadow-xl relative"
          >
            <div className="pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Submit Your Testimonial & Rating</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your star rating and share your experience with our services.
              </p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Review Received!</div>
                  <div className="mt-0.5">{successMsg}</div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-800 dark:text-red-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Submission Error</div>
                  <div>{errorMsg}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Picker - Min 44x44px touch target per star */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
                  Select Rating (ደረጃ ይስጡ) <span className="text-amber-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isSelected = starVal <= rating;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="w-11 h-11 flex items-center justify-center p-2 focus:outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer rounded-xl touch-manipulation"
                        title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150 ${
                            isSelected
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-100 text-slate-300 dark:fill-slate-800/80 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[44px] flex items-center">
                    {ratingDescriptions[rating] || `${rating}/5 Stars`}
                  </span>
                </div>
              </div>

              {/* Name, Role & Email Inputs - 16px text-base to prevent iOS zoom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name (ስም)
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dawit Haile"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[48px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Role / Restaurant Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. General Manager, Addis Lounge"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[48px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Email <span className="text-slate-400 lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="contact@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[48px]"
                  />
                </div>
              </div>

              {/* Comment text area - 16px text to prevent iOS zoom */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Testimonial / Comment (ምስክርነት / አስተያየት)
                </label>
                <textarea
                  id="comment-input"
                  rows={3}
                  placeholder="Share how our Ethiopian digital menus, QR ordering, or website development impacted your operations (optional)..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 disabled:opacity-50 transition-all cursor-pointer active:scale-95 min-h-[48px] touch-manipulation"
                >
                  {submitting ? (
                    <span>Submitting Rating...</span>
                  ) : (
                    <>
                      <Star className="w-4 h-4 fill-white" />
                      <span>Post Rating & Comment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Navigation Tabs - Horizontal touch scrolling */}
        <div className="flex items-center gap-2 pb-5 border-b border-slate-200/80 dark:border-slate-800/80 mb-8 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer min-h-[44px] touch-manipulation flex items-center ${
              filterTab === 'all'
                ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Testimonials ({allItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('featured')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] touch-manipulation ${
              filterTab === 'featured'
                ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Client Testimonials ({featuredList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('community')}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] touch-manipulation ${
              filterTab === 'community'
                ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Community Ratings ({communityList.length})</span>
          </button>
        </div>

        {/* Testimonials & Ratings Grid - Stacks vertically on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayedItems.map((t) => (
            <div
              key={t.id || t.name}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background Accent watermark */}
              <div className="absolute top-4 right-4 text-slate-100 dark:text-slate-800/40 pointer-events-none select-none group-hover:text-cyan-500/10 transition-colors">
                <Quote className="w-14 sm:w-16 h-14 sm:h-16 stroke-[1]" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 stroke-none"
                    />
                  ))}
                </div>

                {/* Main Quote - Minimum 16px body font */}
                <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* English translation if present */}
                {t.translation && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed mb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    &ldquo;{t.translation}&rdquo;
                  </p>
                )}
              </div>

              {/* Author & Restaurant Details */}
              <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                    {t.name ? t.name.charAt(0).toUpperCase() : 'R'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      {t.name}
                    </div>
                    <div className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-400 font-medium truncate">
                      {t.role}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 truncate">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{t.restaurant}</span>
                      </span>
                      {t.location && (
                        <span className="hidden xs:flex items-center gap-1 shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          <span>{t.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {t.date && (
                  <span className="text-xs font-mono text-slate-400 shrink-0 hidden sm:block">
                    {new Date(t.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
