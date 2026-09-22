import React from 'react';

const ReviewsTemplate = ({ album }) => {
  const { reviews, reviewImages } = album;
  if (!reviews) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {reviews.map((review, idx) => (
            <p key={idx}>
              <i className="font-serif whitespace-pre-wrap">"{review.text}"</i><br/>
              <span className="text-sm text-gray-500 ml-8">- <i>{review.author}</i> on <a href={review.link} target="_blank" rel="noreferrer" className="text-shr-green hover:underline">{review.platform}</a></span>
            </p>
        ))}
        <p className="font-bold text-gray-800">And many more happy people stories...</p>
      </div>

      {reviewImages && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reviewImages.map((item, idx) => (
            <figure key={idx} className="bg-white p-3 border border-gray-300 shadow-sm text-center">
                {/* THE BUG FIX IS HERE: We correctly use item.src instead of item.img */}
                <img src={item.src} className="w-full h-auto mb-2" alt={item.caption} />
                <figcaption className="text-xs text-gray-600">
                <span className="font-normal block">Small Hotel Room - {album.title}</span>
                {item.caption}
                </figcaption>
            </figure>
            ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsTemplate;