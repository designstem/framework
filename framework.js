// 2D

import FScene from "./components/2d/FScene.js";
export { FScene };

import FArtboard from "./components/2d/FArtboard.js";
export { FArtboard };

import FGrid from "./components/2d/FGrid.js";
export { FGrid };

import FGroup from "./components/2d/FGroup.js";
export { FGroup };

import FBox from "./components/2d/FBox.js";
export { FBox };

import FPoint from "./components/2d/FPoint.js";
export { FPoint };

import FLine from "./components/2d/FLine.js";
export { FLine };

import FCircle from "./components/2d/FCircle.js";
export { FCircle };

import FPolygon from "./components/2d/FPolygon.js";
export { FPolygon };

import FRegularpolygon from "./components/2d/FRegularpolygon.js";
export { FRegularpolygon };

// 3D

import FScene3 from "./components/3d/FScene3.js";
export { FScene3 }

import FBox3 from "./components/3d/FBox3.js";
export { FBox3 }

import FGrid3 from "./components/3d/FGrid3.js";
export { FGrid3 }

import FGroup3 from "./components/3d/FGroup3.js";
export { FGroup3 }

import FLine3 from "./components/3d/FLine3.js";
export { FLine3 }

import FCircle3 from "./components/3d/FCircle3.js";
export { FCircle3 };

import FTriangle3 from "./components/3d/FTriangle3.js";
export { FTriangle3 }

import FPolygon3 from "./components/3d/FPolygon3.js";
export { FPolygon3 }

import FRegularpolygon3 from "./components/3d/FRegularpolygon3.js";
export { FRegularpolygon3 }

import FHedron3 from "./components/3d/FHedron3.js";
export { FHedron3 }

import FPolyhedron3 from "./components/3d/FPolyhedron3.js";
export { FPolyhedron3 }

// Transitions

import FFade from "./components/transitions/FFade.js";
export { FFade };

import FBounce from "./components/transitions/FBounce.js";
export { FBounce };

// Data

import FArrayData from "./components/data/FArrayData.js";
export { FArrayData };

import FAnimationData from "./components/data/FAnimationData.js";
export { FAnimationData };

import FButtonsData from "./components/data/FButtonsData.js";
export { FButtonsData };

import FRgbData from "./components/data/FRgbData.js";
export { FRgbData };

import FHslData from "./components/data/FHslData.js";
export { FHslData };

import FSliderData from "./components/data/FSliderData.js";
export { FSliderData }

import FFetchData from "./components/data/FFetchData.js";
export { FFetchData };

import FSheetData from "./components/data/FSheetData.js";
export { FSheetData }

import FRotationData from "./components/data/FRotationData.js";
export { FRotationData };

// Content

import FMath from "./components/content/FMath.js";
export { FMath }

import FSidebar from "./components/content/FSidebar.js";
export { FSidebar }

// Layout

import FButtons from "./components/layout/FButtons.js";
export { FButtons };

import FTheme from "./components/layout/FTheme.js";
export { FTheme }

import FContentDocument from "./components/layout/FContentDocument.js";
export  { FContentDocument }

import FContentSlides from "./components/layout/FContentSlides.js";
export  { FContentSlides }

import FContentCards from "./components/layout/FContentCards.js";
export  { FContentCards }

import FTabs from "./components/layout/FTabs.js";
export  { FTabs }

import FEditor from "./components/layout/FEditor.js";
export { FEditor }

// Internal

import Markdown from "./components/Markdown.js";
export { Markdown }

import Render from "./components/Render.js";
export { Render }

// Experimental

import FSceneData from "./components/experimental/FSceneData.js";
export { FSceneData };

import FDragData from "./components/experimental/FDragData.js";
export { FDragData };

import FScene3vr from "./components/experimental/FScene3vr.js";
export { FScene3vr }

import FGrid3vr from "./components/experimental/FGrid3vr.js";
export { FGrid3vr }

import FBox3vr from "./components/experimental/FBox3vr.js";
export { FBox3vr }

import FLine3vr from "./components/experimental/FLine3vr.js";
export { FLine3vr }

import FKeyboardData from "./components/experimental/FKeyboardData.js";
export { FKeyboardData };

export const sortedComponents = [
  
  // 2D
  { FScene },
  { FArtboard },
  { FGrid },
  { FGroup },
  { FBox },
  { FPoint },
  { FLine },
  { FCircle },
  { FPolygon },
  { FRegularpolygon },

  // 3D

  { FScene3 },
  { FBox3 },
  { FGrid3 },
  { FGroup3 },
  { FLine3 },
  { FTriangle3 },
  { FCircle3 },
  { FPolygon3 },
  { FRegularpolygon3 },
  { FHedron3 },
  { FPolyhedron3 },

  // Content
  { FMath },
  { FSidebar },

  // Data
  { FAnimationData },
  { FArrayData },
  { FButtonsData },
  { FSliderData },
  { FHslData },
  { FRgbData },
  { FRotationData },
  { FFetchData },
  { FSheetData },

  // Transitions

  { FFade },
  { FBounce },

  // Experimental
  { FKeyboardData },

];
