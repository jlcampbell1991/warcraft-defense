# Implementation Specification: US Army Made Detonation Dilemma More Dangerous By Replacing Blast Doors With Plywood

## 1. Objective
Create a clear, self‑contained specification that instructs a downstream LLM coding agent to add a short narrative story to the repository. The story must be based on the prompt “The blast doors were removed in preparation” and should be saved as a new Markdown file in the repository root.

## 2. Existing Architecture and Relevant Code
The repository is a JavaScript/Node tower‑defense game. Apart from source code under `src/` and tests under `test/`, the root directory already contains a few free‑form Markdown documents such as:
- `pr-description.md`
- `story-libya-ukraine.md`
- `plans/warcraft-defense.md`
These files are plain Markdown and are not imported by the application; they serve as documentation or narrative assets. Adding another Markdown file follows the existing pattern and does not affect the build or runtime.

No existing code references a story file, so no source changes are required.

## 3. Required Changes

### 3.1 Files to Modify
*None.* No source, test, or configuration files need to be altered.

### 3.2 Files to Create
- **Path:** `story-blast-doors.md` (at the repository root)
- **Responsibility:** Contain the requested story.
- **Content Requirements:**
  - Title reflecting the theme, e.g., `# The Blast Door Dilemma`.
  - The narrative must incorporate the exact phrase **“The blast doors were removed in preparation”**.
  - Length: roughly 300‑500 words, written in a vivid, short‑story style.
  - No code blocks; plain prose only.
  - End with a concluding line that hints at the consequences of using plywood.

## 4. Implementation Plan
1. Create the file `story-blast-doors.md`.
2. Write the story meeting the content requirements above.
3. Save the file.
4. Verify the file exists, is non‑empty, and contains the required phrase.

## 5. Code Samples and Technical Details
```markdown
# The Blast Door Dilemma

The blast doors were removed in preparation for the new experimental training exercise…

[...story body...]

And that is how a simple substitution of plywood for steel turned a drill into a catastrophe.
```
The exact wording of the story body is left to the implementing agent, but it must stay within the word count and maintain narrative coherence.

## 6. Error Handling and Edge Cases
- **Missing phrase:** If the story does not contain the exact phrase, the implementation fails the acceptance criteria.
- **File creation failure:** Ensure the path is correct and the session has write permission to the repository root.
- **File truncation:** Verify the full content after writing; the file must not be cut off.

## 7. Testing Requirements
No automated tests are required because the change is documentation‑only. Manual verification steps:
1. Run `ls -1 story-blast-doors.md` to confirm the file exists.
2. Open the file and search for the exact phrase “The blast doors were removed in preparation”.
3. Count words (≈300‑500) to ensure reasonable length.

## 8. Acceptance Criteria
- [ ] `story-blast-doors.md` exists at the repository root.
- [ ] The file is non‑empty and contains the exact phrase **“The blast doors were removed in preparation”**.
- [ ] Story length is between 300 and 500 words.
- [ ] No other files are modified.
- [ ] The specification file `task-description.md` (this document) is correctly written and contains all required sections.

## 9. Outstanding Questions and Assumptions
- The specification assumes the implementing agent has write access to the repository root.
- No style guide is enforced for narrative prose; the agent may choose any appropriate tone.
- No further integration with the game code is required.