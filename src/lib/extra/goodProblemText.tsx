export default function ProblemGuidelines() {
  return (
    <div className="space-y-6 text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
      
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">
          Follow these guidelines to format your problem effectively:
        </p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Item 1 */}
        <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800/60">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            1. Provide a Minimal, Reproducible Example
          </h3>
        </div>

        {/* Item 2 */}
        <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800/60">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            2. State the Expected vs. Actual Behavior
          </h3>
          <p className="text-sm">
            It does not work or Its broken does not give enough context. Clearly separate what you wanted the code to do from what it is actually doing.
          </p>
        </div>

        {/* Item 3 */}
        <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800/60">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            3. Detail What You Have Already Tried
          </h3>
          <p className="text-sm">
            List the troubleshooting steps you have already taken. This demonstrates that you have put effort into solving the problem yourself and prevents the community from wasting time suggesting solutions you already know do not work.
          </p>
        </div>
        
        {/* Item 4 */}
        <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-800/60">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            4. Include Relevant Context and Versions
          </h3>
          <p className="text-sm">
            The tech ecosystem moves fast, and bugs are often specific to certain versions or environments. Always include your stack details:
          </p>
        </div>

      </div>
    </div>
  );
}