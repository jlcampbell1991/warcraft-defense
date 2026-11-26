# Pull Request Description

Implemented a lightweight in‑game UI feature to display a news‑style story about the Israeli parliamentary inquiry.

### Changes Made
- **src/ui.js**: Imported `showStory` from the new module, added a **Story** button to the build menu, and attached a click handler to open the story overlay.
- **src/story.js**: New module providing `STORY_TEXT` constant and `showStory()` function that creates a dismissible overlay with the story content.
- **test/story.test.js**: Added unit test verifying the module exports and that the story text contains the expected keyword.
- Updated UI initialization to integrate the new button and handler.

The new feature is fully covered by the added test and does not affect existing functionality.
