// likeUtils.js

const LIKED_KEY = 'likedProduct';

export const getLiked = () => {
  const liked = localStorage.getItem('likedItems');
  return liked ? JSON.parse(liked) : [];
};

export const saveLiked = (items) => {
  localStorage.setItem('likedItems', JSON.stringify(items));
};

export function removeLiked() {
  localStorage.removeItem(LIKED_KEY);
}

export function toggleLike(product) {
  const liked = getLiked();
  if (liked && liked.id === product.id) {
    localStorage.removeItem('LikedItem');
  } else {
    localStorage.setItem('LikedItem', JSON.stringify(product));
  }
}

export const isLiked = (product) => {
  const liked = getLiked();
  return liked && liked.id === product.id;
};
