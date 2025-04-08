import React, { useState } from "react";
import FaceLiveness from "./FaceLiveness";
import ReferenceImage from "./ReferenceImage";

function LivenessFlow() {
  const [showLiveness, setShowLiveness] = useState(true);
  const [livenessResult, setLivenessResult] = useState(null);

  const handleFaceLivenessResult = (result) => {
    if (!result || !result.Confidence) {
      // Retry flow
      alert("Face not detected properly. Please try again.");
      setShowLiveness(false); // hide FaceLiveness
      return;
    }

    // Success flow
    setLivenessResult(result);
    setShowLiveness(false); // hide FaceLiveness
  };

  const tryAgain = () => {
    setLivenessResult(null);
    setShowLiveness(true); // re-show FaceLiveness
  };

  return (
    <>
      {showLiveness ? (
        <FaceLiveness faceLivenessAnalysis={handleFaceLivenessResult} />
      ) : livenessResult ? (
        <ReferenceImage
          faceLivenessAnalysis={livenessResult}
          tryagain={tryAgain}
        />
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Session ended. Please try again.</p>
          <button onClick={tryAgain}>Retry</button>
        </div>
      )}
    </>
  );
}

export default LivenessFlow;
