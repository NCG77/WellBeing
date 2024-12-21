import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Audio } from "expo-av";
import { recommendedSongs } from "../data/Songs";

const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
  const soundObject = useRef(new Audio.Sound());
  const [currentTrack, setCurrentTrack] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState(recommendedSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [repeatState, setRepeatState] = useState("none"); // Updated repeatState to "none", "single", "playlist"
  const [isMuted, setisMuted] = useState(false); 

  // Handle playback status updates
  const handlePlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setTrackDuration(status.durationMillis / 1000);

      // If the song has finished
      if (status.didJustFinish) {
        if (repeatState === "single") {
          console.log("Repeat state is 'single', repeating track...");

          // Ensure we play the track again from the beginning
          await soundObject.current.replayAsync(); // Replay current track
        } else if (repeatState === "playlist") {
          console.log("Repeat state is 'playlist', going to next track...");
          handleNextTrack(); // Go to the next track in the playlist
        } else {
          console.log("No repeat, stopping playback.");
        }
      }
    }
  };

  useEffect(() => {
    if (soundObject.current) {
      soundObject.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      if (soundObject.current) {
        soundObject.current.setOnPlaybackStatusUpdate(null); // Cleanup listener
      }
    };
  }, [repeatState]);

  const toggleRepeat = useCallback(() => {
    console.log("Toggling repeat. Current state:", repeatState);

    setRepeatState((prev) => {
      if (prev === "none") {
        console.log("Switching repeat to 'single'");
        return "single"; // Switch to repeat single track
      }
      if (prev === "single") {
        console.log("Switching repeat to 'playlist'");
        return "playlist"; // Switch to repeat playlist
      }
      console.log("Switching repeat to 'none'");
      return "none"; // Switch to no repeat
    });
  }, [repeatState]);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    setisMuted((prev) => !prev); // Toggle isMuted
    if (soundObject.current) {
      soundObject.current.setIsMutedAsync(!isMuted); // Mute/unmute based on the updated isMuted state
    }
  }, [isMuted]);

  const handlePlayPause = useCallback(
    async (track) => {
      if (!track || !track.url) {
        console.log("Track or Track URL is missing");
        return;
      }

      if (currentTrack?.url === track.url && soundObject.current) {
        const status = await soundObject.current.getStatusAsync();
        if (status.isLoaded) {
          if (isPlaying) {
            await soundObject.current.pauseAsync();
            setIsPlaying(false);
          } else {
            await soundObject.current.playAsync();
            setIsPlaying(true);
          }
        }
      } else {
        setCurrentTrack(track);
        try {
          const status = await soundObject.current.getStatusAsync();
          if (status.isLoaded) {
            await soundObject.current.stopAsync();
            await soundObject.current.unloadAsync();
          }

          await soundObject.current.loadAsync({ uri: track.url });
          await soundObject.current.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.error("Playback Error:", error);
        }
      }
    },
    [currentTrack, isPlaying] // No need to include isMuted here
  );

  const handlePreviousTrack = useCallback(() => {
    const currentIndex = trackList.findIndex(
      (track) => track.url === currentTrack?.url
    );
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;

    if (prevIndex !== -1) {
      const prevTrack = trackList[prevIndex];
      setCurrentTrack(prevTrack);
      handlePlayPause(prevTrack);
    }
  }, [trackList, currentTrack, handlePlayPause]);

  const handleNextTrack = useCallback(() => {
    const currentIndex = trackList.findIndex(
      (track) => track.url === currentTrack?.url
    );
    const nextIndex =
      currentIndex < trackList.length - 1 ? currentIndex + 1 : -1;

    if (nextIndex !== -1) {
      const nextTrack = trackList[nextIndex];
      setCurrentTrack(nextTrack);
      handlePlayPause(nextTrack);
    }
  }, [trackList, currentTrack, handlePlayPause]);

  const seekTo = useCallback(async (position) => {
    try {
      const status = await soundObject.current.getStatusAsync();
      if (status.isLoaded) {
        await soundObject.current.setPositionAsync(position * 1000); // Seek to position in milliseconds
      }
    } catch (error) {
      console.error("Seek Error:", error);
    }
  }, []);

  return (
    <PlaybackContext.Provider
      value={{
        currentTrack,
        isPlaying,
        position,
        trackDuration, // Provide track duration as part of context
        handlePlayPause,
        seekTo,
        handlePreviousTrack,
        handleNextTrack,
        trackList,
        repeatState,
        toggleRepeat, // Expose the toggle function
        isMuted, // Provide isMuted state
        toggleMute, // Expose the mute toggle function
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = () => useContext(PlaybackContext);
