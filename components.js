// Component-based approach for Cousin website
class CousinPage {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    document.title = this.config.title || 'COUSIN';
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Add logo (if exists)
    if (this.config.logo) {
      container.appendChild(this.createLogo());
    }
    
    // Add text block only if there's content
    if (this.config.textContent && this.config.textContent.length > 0) {
      container.appendChild(this.createTextBlock());
    }
    
    // Add page-specific content
    if (this.config.content) {
      container.appendChild(this.config.content);
    }
    
    // Add navigation component
    if (this.config.useTestNav) {
      container.appendChild(this.createTestNavigation());
    } else {
      container.appendChild(this.createNavigation());
    }
    
    // Clear body and add container
    document.body.innerHTML = '';
    document.body.appendChild(container);
  }

  createLogo() {
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo';
    
    const logoImg = document.createElement('img');
    logoImg.src = this.config.logo.src;
    logoImg.alt = this.config.logo.alt;
    logoImg.className = 'logo-image';
    
    // Add custom styles if provided
    if (this.config.logo.styles) {
      Object.assign(logoImg.style, this.config.logo.styles);
    }
    
    // Logo positioning logic
    const commonStyles = {
      position: 'fixed',
      height: 'auto',
      zIndex: '1000',
      pointerEvents: 'none'
    };
    
    Object.assign(logoImg.style, commonStyles);
    
    if (this.config.logo.src === 'cousin_logo_HiRes_2.png') {
      // Always use CousinBigTop
      logoImg.src = 'logo_varients/CousinBigTop.png';
      
      // Big Top: top, full width, fixed position
      Object.assign(logoImg.style, {
        width: '100%',
        objectFit: 'cover',
        top: '0',
        left: '0',
        right: '0',
        padding: '1em',
        transform: 'none',
        boxSizing: 'border-box'
      });
    } else if (this.config.logo.src === 'hi.png') {
      // hi logo: right third, vertically centered, responsive
      Object.assign(logoImg.style, {
        left: '75vw',
        top: '50vh',
        width: '15vw',
        transform: 'translate(-50%, -50%)'
      });
    } else if (this.config.logo.src === 'Ariel_Martin/Ariel.png') {
      // Ariel logo: top left quadrant, responsive
      Object.assign(logoImg.style, {
        left: '25vw',
        top: '25vh',
        width: '60vw',
        transform: 'translate(-50%, -50%)'
      });
    } else {
      // Other logos: random positioning
      const randomX = Math.random() * 80 + 10;
      const randomY = Math.random() * 55 + 10;
      
      Object.assign(logoImg.style, {
        left: randomX + 'vw',
        top: randomY + 'vh',
        transform: 'translate(-50%, -50%)'
      });
    }
    
    logoDiv.appendChild(logoImg);
    return logoDiv;
  }

  createTextBlock() {
    const textBlock = document.createElement('div');
    textBlock.className = 'text-block';
    
    // Add content
    this.config.textContent.forEach(item => {
      if (typeof item === 'string') {
        const p = document.createElement('p');
        p.textContent = item;
        textBlock.appendChild(p);
      } else if (item.type === 'link') {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;
        a.style.color = 'inherit';
        a.style.textDecoration = 'none';
        p.appendChild(a);
        textBlock.appendChild(p);
      } else if (item.type === 'br') {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        textBlock.appendChild(p);
      } else if (item.type === 'container') {
        const div = document.createElement('div');
        div.id = item.id;
        textBlock.appendChild(div);
      }
    });
    
    return textBlock;
  }

  createNavigation() {
    const nav = document.createElement('div');
    nav.className = 'navigation';
    
    const links = [
      { href: 'about.html', text: 'About' },
      { href: 'arial_martin.html', text: 'Directors' },
      { href: 'contact.html', text: 'Contact' }
    ];
    
    links.forEach(linkData => {
      const link = document.createElement('a');
      link.href = linkData.href;
      link.textContent = linkData.text;
      Object.assign(link.style, {
        color: 'inherit',
        textDecoration: 'none'
      });
      nav.appendChild(link);
    });
    
    return nav;
  }

  createTestNavigation() {
    const nav = document.createElement('div');
    nav.className = 'navigation';
    
    const links = [
      { href: '#', text: 'About' },
      { href: 'arial_martin.html', text: 'Directors' },
      { href: 'contact.html', text: 'Contact' }
    ];
    
    links.forEach(linkData => {
      const link = document.createElement('a');
      link.href = linkData.href;
      link.textContent = linkData.text;
      Object.assign(link.style, {
        color: 'inherit',
        textDecoration: 'none'
      });
      nav.appendChild(link);
    });
    
    return nav;
  }

  toggleAboutContent(content) {
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  }

  attachEventListeners() {
    // Add page-specific event listeners
    if (this.config.onInit) {
      this.config.onInit();
    }
  }
}

// Page configurations
const pages = {
  home: {
    title: 'COUSIN',
    logo: {
      src: 'cousin_logo_HiRes_2.png',
      alt: 'COUSIN'
    },
    textContent: [],
    useTestNav: true
  },

  about: {
    title: 'COUSIN - ABOUT',
    logo: {
      src: 'cousin_logo_HiRes_2.png',
      alt: 'COUSIN'
    },
    textContent: [
      'That person you ran with',
      'The one you trusted',
      'The one you built stuff with',
      'Wrecked stuff with',
      'The one who lit the fuse and said run'
    ]
  },

  contact: {
    title: 'COUSIN - CONTACT',
    logo: {
      src: 'hi.png',
      alt: 'COUSIN',
      styles: {
        'width': '400px'
      }
    },
    textContent: [
      'Nick Simkins',
      'Founder & EP',
      { type: 'br' },
      'T: +61 415 064 495',
      'E: nick@cousin.site',
      'Insta Linkedin'
    ]
  },

  ariel: {
    title: 'COUSIN - ARIEL MARTIN',
    logo: {
      src: 'Ariel_Martin/Ariel.png',
      alt: 'ARIEL',
      styles: {
        'mix-blend-mode': 'multiply',
        'width': '58%'
      }
    },
    textContent: [
      { type: 'container', id: 'director-name' },
      { type: 'br' },
      { type: 'container', id: 'projects-container' }
    ],
    content: createArielContent(),
    onInit: initArielPage
  }
};

// Helper functions for Ariel page
function createArielContent() {
  const hoverImage = document.createElement('div');
  hoverImage.id = 'hover-image';
  hoverImage.className = 'hover-image';
  
  const hoverImg = document.createElement('img');
  hoverImg.id = 'hover-img';
  hoverImg.src = '';
  hoverImg.alt = '';
  hoverImage.appendChild(hoverImg);
  
  const modal = document.createElement('div');
  modal.id = 'video-modal';
  modal.className = 'video-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'video-modal-content';
  
  const video = document.createElement('video');
  video.id = 'modal-video';
  video.autoplay = true;
  video.innerHTML = '<source src="" type="video/mp4">Your browser does not support the video tag.';
  
  const backButton = document.createElement('div');
  backButton.className = 'back-button';
  backButton.id = 'back-button';
  backButton.textContent = 'Back';
  
  const playPauseText = document.createElement('div');
  playPauseText.className = 'play-pause-text';
  playPauseText.id = 'play-pause-text';
  playPauseText.textContent = 'Pause';
  
  modalContent.appendChild(video);
  modalContent.appendChild(backButton);
  modalContent.appendChild(playPauseText);
  modal.appendChild(modalContent);
  
  const container = document.createElement('div');
  container.appendChild(hoverImage);
  container.appendChild(modal);
  
  return container;
}

function initArielPage() {
  // Load CSV and generate projects
  if (typeof Papa !== 'undefined') {
    Papa.parse('ArielMartin.csv', {
      download: true,
      header: true,
      complete: function(results) {
        const container = document.getElementById('projects-container');
        const hoverImage = document.getElementById('hover-image');
        const hoverImg = document.getElementById('hover-img');
        const directorName = document.getElementById('director-name');
        
        // Filter out empty rows and store globally
        window.validData = results.data.filter(item => item.Client && item.Title);
        
        // Set director name from first valid row
        if (window.validData.length > 0 && window.validData[0].Director) {
          directorName.textContent = window.validData[0].Director;
        }
        
        window.validData.forEach(function(row, index) {
          if (row.Client && row.Title) {
            const projectElement = document.createElement('p');
            projectElement.textContent = `${row.Client} '${row.Title}'`;
            projectElement.className = 'project-item';
            projectElement.dataset.thumbnail = row.Thumbnail;
            projectElement.dataset.video = row.Video;
            projectElement.dataset.index = index;
            
            
            // Add hover events
            projectElement.addEventListener('mouseenter', function() {
              hoverImg.src = row.Thumbnail;
              hoverImage.style.display = 'flex';
            });
            
            projectElement.addEventListener('mouseleave', function() {
              hoverImage.style.display = 'none';
            });
            
            // Add click event for video modal
            projectElement.addEventListener('click', function() {
              const modal = document.getElementById('video-modal');
              const video = document.getElementById('modal-video');
              modal.style.display = 'flex';
              
              // Set video source
              video.src = row.Video;
              video.load();
              
              video.addEventListener('loadeddata', function() {
                // Connect play/pause text to video
                const playPauseText = document.getElementById('play-pause-text');
                const modal = document.getElementById('video-modal');
                
                // Set initial play/pause text based on video state
                if (video.paused) {
                  playPauseText.textContent = 'Play';
                } else {
                  playPauseText.textContent = 'Pause';
                }
                
                // Update text when video state changes
                video.addEventListener('play', function() {
                  playPauseText.textContent = 'Pause';
                });
                
                video.addEventListener('pause', function() {
                  playPauseText.textContent = 'Play';
                });
                
                // Click on play/pause text to toggle
                playPauseText.addEventListener('click', function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  if (video.paused) {
                    video.play().then(() => {
                      playPauseText.textContent = 'Pause';
                    }).catch(err => {
                      console.error('Error playing video:', err);
                    });
                  } else {
                    video.pause();
                    playPauseText.textContent = 'Play';
                  }
                });
                
                // Back button functionality
                const backButton = document.getElementById('back-button');
                backButton.addEventListener('click', function() {
                  modal.style.display = 'none';
                  video.pause();
                  video.currentTime = 0;
                });
              });
            });
            
            container.appendChild(projectElement);
          }
        });
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('video-modal');
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      const video = document.getElementById('modal-video');
      video.pause();
      video.currentTime = 0;
    }
  });
}

// Export for use
window.CousinPage = CousinPage;
window.pages = pages;
