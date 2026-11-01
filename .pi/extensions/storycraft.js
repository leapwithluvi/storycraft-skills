// StoryCraft extension for Pi
export function activate(context) {
  // Injects using-storycraft bootstrap at session startup
  context.onSessionStart(() => {
    return 'StoryCraft skills active. To initialize or resume a novel project, invoke using-storycraft.';
  });
}
