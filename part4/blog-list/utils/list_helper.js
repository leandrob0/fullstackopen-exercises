const dummy = (blogs) => {
  if (blogs) return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum, val) => sum + val.likes, 0);
};

const mostLiked = (blogs) => {
  if (blogs.length === 0) return undefined;
  let max = Number.NEGATIVE_INFINITY;
  let maxIndex;

  blogs.map((val,i) => {
    if (val.likes > max) {
      max = val.likes;
      maxIndex = i;
    }
  });

  return blogs[maxIndex];
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
};
