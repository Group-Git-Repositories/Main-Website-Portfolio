import { NextResponse } from 'next/server';
import {
  getCommentsData,
  saveComment,
  updateComment,
  deleteComment,
  getCompanyData,
  saveCompanyData,
} from '../../../lib/data';
import { getSessionFromRequest } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    const withTestimonials = searchParams.get('withTestimonials') === 'true';

    const comments = await getCommentsData();

    let accessibleComments = comments;
    if (showAll) {
      const session = getSessionFromRequest(request);
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized: Admin session required to view all comments' },
          { status: 401 }
        );
      }
    } else {
      // Public view: return visible/approved comments
      accessibleComments = comments.filter((c) => c.status !== 'Hidden');
    }

    if (withTestimonials) {
      const companyData = await getCompanyData();
      const testimonials = companyData?.testimonials || [];

      // Combine both sources
      const combined = [
        ...testimonials.map((t) => ({
          id: t.id || `test-${t.clientName}`,
          name: t.clientName,
          role: t.role,
          restaurant: t.restaurant,
          location: t.location,
          rating: Number(t.rating) || 5,
          comment: t.quote,
          translation: t.translation,
          isFeaturedTestimonial: true,
          type: 'testimonial',
          createdAt: null,
        })),
        ...accessibleComments.map((c) => ({
          ...c,
          isFeaturedTestimonial: !!c.promoted,
          type: 'comment',
        })),
      ];

      const totalItems = combined.length;
      const avgRating =
        totalItems > 0
          ? (
              combined.reduce((sum, item) => sum + (Number(item.rating) || 5), 0) / totalItems
            ).toFixed(1)
          : '5.0';

      return NextResponse.json({
        comments: accessibleComments,
        testimonials,
        combined,
        averageRating: avgRating,
        totalCount: totalItems,
      });
    }

    return NextResponse.json(accessibleComments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    return NextResponse.json({ error: 'Failed to retrieve comments' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const ratingNum = Number(payload.rating) || 5;
    const finalRating = Math.min(5, Math.max(1, Math.round(ratingNum)));
    const finalComment =
      payload.comment && typeof payload.comment === 'string' && payload.comment.trim()
        ? payload.comment.trim()
        : `Verified ${finalRating}-star rating from client`;

    const newComment = await saveComment({
      name: payload.name?.trim() || 'Anonymous Client',
      email: payload.email?.trim() || '',
      role: payload.role?.trim() || 'Client',
      rating: finalRating,
      comment: finalComment,
      status: 'Approved', // Visible immediately by default
    });

    return NextResponse.json({
      success: true,
      message: 'Rating and comment submitted successfully.',
      comment: newComment,
    });
  } catch (err) {
    console.error('Error submitting comment:', err);
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 });
  }
}

export async function PATCH(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    // Action: Promote comment into a permanent featured testimonial
    if (action === 'promote') {
      const comments = await getCommentsData();
      const target = comments.find((c) => c.id === id);
      if (!target) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
      }

      const companyData = await getCompanyData();
      const testimonials = companyData?.testimonials || [];

      // Check if already in testimonials
      const existingIdx = testimonials.findIndex((t) => t.fromCommentId === id);
      if (existingIdx >= 0) {
        return NextResponse.json({
          success: true,
          message: 'Comment is already featured in testimonials.',
          testimonial: testimonials[existingIdx],
        });
      }

      const newTestimonial = {
        id: `test-promoted-${Date.now()}`,
        clientName: target.name,
        role: target.role || 'ባለቤት / ደንበኛ (Client)',
        restaurant: target.role || 'Addis Ababa Partner',
        location: 'አዲስ አበባ (Addis Ababa)',
        rating: target.rating || 5,
        quote: target.comment,
        translation: target.comment,
        fromCommentId: target.id,
      };

      companyData.testimonials = [newTestimonial, ...testimonials];
      await saveCompanyData(companyData);
      const updated = await updateComment(id, { promoted: true, testimonialId: newTestimonial.id });

      return NextResponse.json({
        success: true,
        message: 'Comment successfully connected and promoted to Featured Testimonial!',
        comment: updated,
        testimonial: newTestimonial,
      });
    }

    const updated = await updateComment(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, comment: updated });
  } catch (err) {
    console.error('Error updating comment:', err);
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body?.id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    const deleted = await deleteComment(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Comment not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
