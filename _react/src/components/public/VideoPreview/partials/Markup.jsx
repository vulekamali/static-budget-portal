import React from 'react';
import './../styles.scss'
import ReactButton from './../../../private/ReactButton/index.jsx';
import ReactCard from './../../../private/ReactCard/index.jsx';
import ReactIcon from './../../../private/ReactIcon/index.jsx';
import ReactVideoEmbed from './../../../private/ReactVideoEmbed';
import ReactPlaceholder from './../../../private/ReactPlaceholder';
import Truncate from 'react-truncate';


export default function Markup(props) {
  const {
    title,
    description,
    languages,
    selected,
    showVideo,
    loading,
  } = props;


  if (loading) {
    return (
      <div className="VideoPreview">
        <ReactPlaceholder />
      </div>
    )
  }

  const buttons = Object.keys(languages).map((language, index) => {
    if (index > 5) {
      return null;
    }

    const onClick = () => showVideo(
      <ReactVideoEmbed selected={language} {...{ languages }} />, 
      language,
    );

    return (
      <span 
        key={language}
        className="u-inline-block u-mr-2 u-mt-3"
      >
        <ReactButton 
          size="small"
          inline
          {...{ onClick }}
        >
          {language}
        </ReactButton>
      </span>
    )
  })


  const onClick = () => showVideo(
    <ReactVideoEmbed {...{ languages, selected }} />, 
    selected,
  );


  const preview = (
    <div
      className ="VideoPreview-preview"
      aria-hidden
      style={{ backgroundImage: `url('https://img.youtube.com/vi/${languages[selected]}/mqdefault.jpg')` }}
      {...{ onClick }}
    >
      <div className="VideoPreview-icon">
        <ReactIcon type="play" size="large" />
      </div>
  </div>
  )

  return (
    <div className="VideoPreview">
      <ReactCard {...{ preview }}>
        <div className="VideoPreview-title">{title}</div>
        <div className="VideoPreview-buttons">
          {buttons}
        </div>
        <div className="VideoPreview-block">
          <Truncate lines={3}>
          {description}
          </Truncate>
        </div>
      </ReactCard>
    </div>
  )
}

