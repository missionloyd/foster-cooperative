// The handler to smoothly scroll the element into view
export const handExitComplete = () => {
    // Get the hash from the url
    const hashId = 'top';
    if (hashId) {
      // Use the hash to find the first element with that id
      const element = document.querySelector(hashId);
      console.log('test');

      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
};