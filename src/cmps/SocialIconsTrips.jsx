import React from 'react';

export function SocialIconsTrips() {

  return (
    <ul className='example-2'>
      <li className='icon-content'>
        <a href="https://linkedin.com/" aria-label="LinkedIn" data-social="linkedin">
          <div className="filled"></div>
          {/* LinkedIn SVG - Omitted for brevity */}
        </a>
        <div className="tooltip">LinkedIn</div>
      </li>
      <li className='icon-content'>
        <a href="https://www.github.com/" aria-label="GitHub" data-social="github">
          <div className="filled"></div>
          {/* GitHub SVG - Omitted for brevity */}
        </a>
        <div className="tooltip">GitHub</div>
      </li>
      <li className='icon-content'>
        <a href="https://www.instagram.com/" aria-label="Instagram" data-social="instagram">
          <div className="filled"></div>
          {/* Instagram SVG - Omitted for brevity */}
        </a>
        <div className="tooltip">Instagram</div>
      </li>
      <li className='icon-content'>
        <a href="https://youtube.com/" aria-label="Youtube" data-social="youtube">
          <div className="filled"></div>
          {/* YouTube SVG - Omitted for brevity */}
        </a>
        <div className="tooltip">Youtube</div>
      </li>
    </ul>
  );


}