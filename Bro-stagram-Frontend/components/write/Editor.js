import React, { memo } from 'react';
import Styled from 'styled-components';

const Editor = memo(() => {
  return (
    <div>
      <div>사진 넣는 곳</div>
      <div>
        <textarea />
      </div>
      <div>
        <button>Submit</button>
        <button>Cancle</button>
      </div>
    </div>
  );
});

export default Editor;
