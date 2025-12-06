// "use client";

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";

// export default function TextWrapper({ children }) {
//   return (
//     <div className="text-gray-100 leading-relaxed space-y-4">
      
//       {/* Paragraphs */}
//       <div className="[&>p]:my-3 [&>p]:text-[15px] [&>p]:leading-[1.6]">
//         {/* Lists */}
//         <div className="[&>ul]:list-disc [&>ul]:ml-6 [&>ul>li]:my-1" >
          
//           {/* Headings */}
//           <div className="[&>h1]:text-2xl [&>h1]:font-semibold [&>h1]:my-4
//                           [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:my-3
//                           [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:my-3">
            
//             {/* Code blocks */}
//             <div className="[&>pre]:bg-zinc-900 [&>pre]:p-3 [&>pre]:rounded-lg 
//                             [&>pre]:border [&>pre]:border-zinc-700 overflow-auto">
              
//               {/* Inline code */}
//               <div className="[&>code]:bg-zinc-900 [&>code]:text-green-400 
//                               [&>code]:px-1 [&>code]:rounded">
                
//                 <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
//                   {children}
//                 </ReactMarkdown>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }



"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function ChatMarkdown({ content }) {
  return (
    <div
      className="
        text-gray-100 leading-[1.65] tracking-wide
        space-y-5
        [&>:first-child]:mt-0
        max-w-full
      "
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-semibold mt-5 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-[15px] leading-relaxed my-3" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 space-y-1 my-3" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-6 space-y-1 my-3" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="bg-zinc-800 text-green-300 px-1 py-0.5 rounded" {...props} />
            ) : (
              <pre className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 overflow-x-auto my-4">
                <code {...props} />
              </pre>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
