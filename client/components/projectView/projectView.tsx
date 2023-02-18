import React from 'react';
import { Player } from '@livepeer/react';

const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <div className="ml-[25%] w-[50%] h-[50%]">
        <Player
          title="Waterfalls"
          playbackId="92e24klizjz8bsqg"
          showPipButton
          showTitle={false}
          aspectRatio="16to9"
          controls={{
            autohide: 3000,
          }}
        />
      </div>
    </div>
  );
};

export default Project;