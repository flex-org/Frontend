// 'use client';

// import React, { useState } from 'react';
// import { 
//   DndContext, 
//   DragOverlay, 
//   useDraggable, 
//   useDroppable, 
//   DragStartEvent, 
//   DragEndEvent, 
//   DragOverEvent 
// } from '@dnd-kit/core';

// // 1. تعريف شكل الـ Feature
// type FeatureItem = {
//   id: string;
//   title: string;
// };

// // 2. مكون الـ Feature في القائمة الجانبية
// function DraggableSidebarItem({ feature }: { feature: FeatureItem }) {
//   const { attributes, listeners, setNodeRef } = useDraggable({
//     id: feature.id,
//     data: feature, // بنبعت الداتا عشان نعرف نقراها لما نبدأ سحب
//   });

//   return (
//     <div 
//       ref={setNodeRef} 
//       {...listeners} 
//       {...attributes} 
//       className="p-4 mb-2 bg-white border border-gray-200 shadow-sm cursor-grab hover:border-blue-500 rounded-lg"
//     >
//       {feature.title}
//     </div>
//   );
// }

// // 3. شكل العنصر وهو "طاير" تحت الماوس (Overlay)
// function FeatureOverlay({ feature }: { feature: FeatureItem }) {
//   return (
//     <div className="p-4 bg-blue-500 text-white shadow-xl rounded-lg opacity-90 scale-105 rotate-3 cursor-grabbing">
//       {feature.title}
//     </div>
//   );
// }

// // 4. منطقة العمل (The Canvas)
// function CanvasArea({ children }: { children: React.ReactNode }) {
//   const { setNodeRef, isOver } = useDroppable({
//     id: 'canvas-area',
//   });

//   return (
//     <div 
//       ref={setNodeRef} 
//       className={`min-h-[400px] w-full border-2 border-dashed rounded-xl transition-all duration-200 p-4
//         ${isOver ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-300 bg-gray-50'}`}
//     >
//       {children}
//     </div>
//   );
// }

// // --- Main Page ---
// export default function BuilderPage() {
//   const [activeFeature, setActiveFeature] = useState<FeatureItem | null>(null); // عشان الـ Overlay
//   const [canvasItems, setCanvasItems] = useState<FeatureItem[]>([]);

//   // Features List (Source)
//   const features: FeatureItem[] = [
//     { id: 'video', title: '📹 Video Player' },
//     { id: 'quiz', title: '📝 Quiz Block' },
//     { id: 'pdf', title: '📄 PDF Viewer' },
//   ];

//   // --- Handlers ---

//   // 1. أول ما تمسك العنصر
//   function handleDragStart(event: DragStartEvent) {
//     // بنسجل إحنا ماسكين مين عشان نعرضه في الـ Overlay
//     if (event.active.data.current) {
//       setActiveFeature(event.active.data.current as FeatureItem);
//     }
//   }

//   // 2. وأنت بتتحرك (اختياري هنا، بس مهم لو بتعمل Sorting)
//   function handleDragOver(event: DragOverEvent) {
//     const { over } = event;
//     // ممكن هنا تعمل Logic لو عندك أكتر من DropZone
//     // console.log('Currently over:', over?.id);
//   }

//   // 3. لما تسيب العنصر
//   function handleDragEnd(event: DragEndEvent) {
//     const { over, active } = event;
//     setActiveFeature(null); // نخفي الـ Overlay

//     // لو رمينا العنصر جوا الـ Canvas
//     if (over && over.id === 'canvas-area') {
//       // بنضيف نسخة جديدة من العنصر للـ Canvas
//       // (بنستخدم Date.now عشان الـ Key يبقى unique لو ضاف نفس العنصر مرتين)
//       const newItem = { 
//         ...active.data.current as FeatureItem, 
//         id: `${active.id}-${Date.now()}` 
//       };
      
//       setCanvasItems((prev) => [...prev, newItem]);
//     }
//   }

//   return (
//     <DndContext 
//       onDragStart={handleDragStart}
//       onDragOver={handleDragOver}
//       onDragEnd={handleDragEnd}
//     >
//       <div className="flex gap-8 p-8 h-screen bg-gray-100">
        
//         {/* Sidebar */}
//         <div className="w-1/4 bg-white p-4 rounded-xl shadow-sm h-fit">
//           <h2 className="font-bold mb-4 text-gray-700">Tools</h2>
//           {features.map((f) => (
//             <DraggableSidebarItem key={f.id} feature={f} />
//           ))}
//         </div>

//         {/* Workspace */}
//         <div className="flex-1">
//           <h2 className="font-bold mb-4 text-gray-700">Course Builder</h2>
//           <CanvasArea>
//             {canvasItems.length === 0 ? (
//               <p className="text-gray-400 text-center mt-10">Drop features here to build your lesson</p>
//             ) : (
//               canvasItems.map((item) => (
//                 <div key={item.id} className="p-4 mb-2 bg-white shadow rounded border-l-4 border-blue-500">
//                   {item.title}
//                 </div>
//               ))
//             )}
//           </CanvasArea>
//         </div>

//       </div>

//       {/* The Magic: العنصر اللي بيظهر تحت الماوس */}
//       <DragOverlay>
//         {activeFeature ? <FeatureOverlay feature={activeFeature} /> : null}
//       </DragOverlay>

//     </DndContext>
//   );
// }
