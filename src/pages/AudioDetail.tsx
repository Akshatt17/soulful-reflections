import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";
import mediaData from "@/data/media.json";

const AudioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const audio = mediaData.audio.find((a) => a.slug === slug);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handleTimeUpdate = () => setCurrentTime(audioEl.currentTime);
    const handleLoadedMetadata = () => setDuration(audioEl.duration);
    const handleEnded = () => setIsPlaying(false);

    audioEl.addEventListener("timeupdate", handleTimeUpdate);
    audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioEl.addEventListener("ended", handleEnded);

    return () => {
      audioEl.removeEventListener("timeupdate", handleTimeUpdate);
      audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioEl.removeEventListener("ended", handleEnded);
    };
  }, []);

  if (!audio) {
    return (
      <PageLayout>
        <div className="section-padding text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Audio Not Found
          </h1>
          <Link to="/media">
            <Button variant="hero">Back to Media</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <PageLayout>
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Media Library
            </Link>

            <div className="bg-card rounded-2xl shadow-card p-8">
              <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                {audio.category}
              </span>
              <h1 className="font-serif text-3xl font-bold text-primary mt-2 mb-4">
                {audio.title}
              </h1>
              <p className="text-muted-foreground mb-8">{audio.description}</p>

              {/* Audio Player */}
              <div className="bg-muted rounded-xl p-6">
                {/* Hidden audio element - uses placeholder since no real audio */}
                <audio ref={audioRef} src={audio.audioUrl} preload="metadata" />

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-primary-foreground" />
                    ) : (
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    )}
                  </button>

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{audio.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="mt-8">
                <h2 className="font-serif text-xl font-bold text-primary mb-4">
                  Transcript
                </h2>
                <div className="bg-muted rounded-xl p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {audio.transcript}
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-4 italic">
                    Full transcript available upon request...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AudioDetail;
