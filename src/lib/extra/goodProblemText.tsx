export default function ProblemGuidelines() {
  return (
    <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
      
      <div>
        <p className="mt-2">
          Follow these guidelines to format your problem effectively:
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          1. Provide a Minimal, Reproducible Example
        </h3>
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          2. State the Expected vs. Actual Behavior
        </h3>
        <p>
          It doesnt work or Its broken does not give enough context. Clearly separate what you wanted the code to do from what it is actually doing.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          3. Detail What You Have Already Tried
        </h3>
        <p>
          List the troubleshooting steps you have already taken. This demonstrates that you have put effort into solving the problem yourself and prevents the community from wasting time suggesting solutions you already know do not work.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          4. Include Relevant Context and Versions
        </h3>
        <p>
          The tech ecosystem moves fast, and bugs are often specific to certain versions or environments. Always include your stack details:
        </p>
      </div>
    </div>
  );
}