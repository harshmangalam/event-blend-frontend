import {
  LuDice3,
  LuCpu,
  LuHeartHandshake,
  LuSchool,
  LuScissors,
  LuMusic,
  LuFlameKindling,
  LuHelpingHand,
  LuActivitySquare,
  LuCamera,
  LuWine,
  LuBriefcase,
  LuImage,
} from "@qwikest/icons/lucide";

type CategoryIcon = { [key: string]: any };

const categoriesIcon: CategoryIcon = {
  games: LuDice3,
  tech: LuCpu,
  "health-wellness": LuHeartHandshake,
  education: LuSchool,
  "hobbies-crafts": LuScissors,
  crafa: LuMusic,
  "outdoors-adventure": LuFlameKindling,
  social: LuHelpingHand,
  fitness: LuActivitySquare,
  photography: LuCamera,
  "food-drink": LuWine,
  business: LuBriefcase,
};

export const getCategoriesIcon = (slug: string) =>
  categoriesIcon[slug] ?? LuImage;
