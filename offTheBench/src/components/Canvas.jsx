import { Stage, Layer, Rect, Line, Circle, Text } from "react-konva";
import { useState, useEffect } from "react";

function Canvas() {
  const getInitialPlayers = (width, height) => {
    const pitchWidth = width;
    const pitchHeight = height;

    // 4-3-3 formation (top to bottom)
    const positions = [
      // Goalkeeper
      [pitchWidth / 2, pitchHeight * 0.12],

      // Defenders
      [pitchWidth * 0.2, pitchHeight * 0.25],
      [pitchWidth * 0.4, pitchHeight * 0.25],
      [pitchWidth * 0.6, pitchHeight * 0.25],
      [pitchWidth * 0.8, pitchHeight * 0.25],

      // Midfielders
      [pitchWidth * 0.3, pitchHeight * 0.45],
      [pitchWidth * 0.5, pitchHeight * 0.45],
      [pitchWidth * 0.7, pitchHeight * 0.45],

      // Forwards
      [pitchWidth * 0.3, pitchHeight * 0.7],
      [pitchWidth * 0.5, pitchHeight * 0.7],
      [pitchWidth * 0.7, pitchHeight * 0.7],
    ];

    return positions.map((pos, i) => ({
      id: i + 1,
      x: pos[0],
      y: pos[1],
      color: "red",
    }));
  };

  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [players, setPlayers] = useState(
    getInitialPlayers(window.innerWidth, window.innerHeight)
  );

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setPlayers(getInitialPlayers(window.innerWidth, window.innerHeight));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (e, id) => {
    const newPlayers = players.map((player) =>
      player.id === id
        ? { ...player, x: e.target.x(), y: e.target.y() }
        : player
    );
    setPlayers(newPlayers);
  };

  return (
    <>
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          {/* Pitch background */}
          <Rect
            x={0}
            y={0}
            width={stageSize.width}
            height={stageSize.height}
            fill="#228B22"
          />

          {/* Halfway line */}
          <Line
            points={[
              0,
              stageSize.height / 2,
              stageSize.width,
              stageSize.height / 2,
            ]}
            stroke="white"
            strokeWidth={4}
          />

          {/* Center circle */}
          <Circle
            x={stageSize.width / 2}
            y={stageSize.height / 2}
            radius={stageSize.width * 0.15}
            stroke="white"
            strokeWidth={4}
          />

          {/* Goalposts */}
          {/* Top goal */}
          <Rect
            x={stageSize.width * 0.35}
            y={0}
            width={stageSize.width * 0.3}
            height={stageSize.height * 0.05}
            stroke="white"
            strokeWidth={3}
          />

          {/* Bottom goal */}
          <Rect
            x={stageSize.width * 0.35}
            y={stageSize.height - stageSize.height * 0.05}
            width={stageSize.width * 0.3}
            height={stageSize.height * 0.05}
            stroke="white"
            strokeWidth={3}
          />

          {/* Players */}
          {players.map((player) => (
            <Circle
              key={player.id}
              x={player.x}
              y={player.y}
              radius={stageSize.width * 0.04}
              fill={player.color}
              stroke="black"
              strokeWidth={2}
              draggable
              onMouseEnter={() => (document.body.style.cursor = "pointer")}
              onMouseLeave={() => (document.body.style.cursor = "default")}
              onDragEnd={(e) => handleDragEnd(e, player.id)}
            />
          ))}

          {/* Player numbers */}
          {players.map((player) => (
            <Text
              key={`label-${player.id}`}
              text={player.id.toString()}
              x={player.x - 6}
              y={player.y - 8}
              fontSize={16}
              fill="white"
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
