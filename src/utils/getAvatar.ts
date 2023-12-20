const foodIcons = [
  "/food-icons/Burger.webp",
  "/food-icons/Buritto.webp",
  "/food-icons/Cake.webp",
  "/food-icons/Carrot.webp",
  "/food-icons/Cofee.webp",
  "/food-icons/Cookies.webp",
  "/food-icons/Croisant.webp",
  "/food-icons/Cup-Cake.webp",
  "/food-icons/Donut.webp",
  "/food-icons/Egg-Bacon.webp",
  "/food-icons/Eggplant.webp",
  "/food-icons/Float.webp",
  "/food-icons/Fries.webp",
  "/food-icons/Hot-Dog.webp",
  "/food-icons/Ice-Cream.webp",
  "/food-icons/Lolipop-Swirl.webp",
  "/food-icons/Lolipop.webp",
  "/food-icons/Macaroon.webp",
  "/food-icons/Meat.webp",
  "/food-icons/Pancake.webp",
  "/food-icons/Pizza.webp",
  "/food-icons/Popsicle.webp",
  "/food-icons/Pretzel.webp",
  "/food-icons/Steak.webp",
  "/food-icons/Sushi-Caviar.webp",
  "/food-icons/Taco.webp",
];

export const getAvatar = () => {
  const randomIndex = Math.floor(Math.random() * foodIcons.length);
  return foodIcons[randomIndex];
};
