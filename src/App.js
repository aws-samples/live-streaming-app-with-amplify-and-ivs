import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from "react";
import Hls from 'hls.js';

import {
  Image,
  View,
  Heading,
  Grid
} from '@aws-amplify/ui-react';

//IVS playback URL
var playbackUrl = "https://bf72c7d5c179.us-east-1.playback.live-video.net/api/video/v1/us-east-1.392240548394.channel.z1yd76RsHOQF.m3u8";

//To add HLS Library and check compatibility
const AddHlsLibrary = () => {

  const script = document.createElement('script');
  var video = document.getElementById('video');
  if (Hls.isSupported()) {
      var hls = new Hls();
      hls.attachMedia(video);

      // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together!');
        hls.loadSource(playbackUrl);
        hls.on(Hls.Events.MANIFEST_PARSED,function (event, data) {
           console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level'
        );
          video.play();
        });
      
      });
    
     
    }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = playbackUrl;
  }

  document.body.appendChild(script);
}

//Add video component 
const  App = () => {
  useEffect(() => {
      AddHlsLibrary();
  },[]);
  return (
    <Grid backgroundColor="var(--amplify-colors-black)" templateColumns="1fr 2fr 1fr" templateRows="1fr 2fr 1fr" gap="var(--amplify-space-small)">
      <View columnSpan={3} rowSpan={1}></View>
  
    <View columnSpan={1} rowSpan={2}></View>
    <View columnSpan={1} rowSpan={2}>
      <video id="video" playsInline controls width="100%" muted="muted"></video>
    </View>
    <View columnSpan={1} rowSpan={2}></View>

    <View columnSpan={1} height="100px"></View>
    <View columnSpan={2} height="100px">
     <Heading level={3} color="white" style={{'textAlign':'left'}}>
        Welcome to AWS Summit Online ANZ 2022!
     </Heading>
     </View>
    </Grid>

  );
  
};

export { App, AddHlsLibrary };