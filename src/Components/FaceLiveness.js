// import React from "react";
// import { useEffect } from "react";
// import { Loader } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

// function FaceLiveness({ faceLivenessAnalysis }) {
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const session_id = params.get("session_id");
//   const session_token = params.get("session_token");
//   console.log("session_id", session_id);
//   console.log("session_token", session_token);

//   const [loading, setLoading] = React.useState(true);
//   const [sessionId, setSessionId] = React.useState(null);

//   const endpoint = process.env.REACT_APP_ENV_API_URL
//     ? process.env.REACT_APP_ENV_API_URL
//     : "";

//   useEffect(() => {
//     /*
//      * API call to create the Face Liveness Session
//      */
//     const fetchCreateLiveness = async () => {
//       const response = await fetch(endpoint + "createfacelivenesssession");
//       const data = await response.json();
//       setSessionId(data.sessionId);
//       setLoading(false);
//     };
//     fetchCreateLiveness();
//   }, []);

//   const handleAnalysisComplete = async () => {
//     try {
//       const response = await fetch(endpoint + "getfacelivenesssessionresults", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sessionid: sessionId }),
//       });

//       const data = await response.json();
//       const result = data.body;

//       console.log("Liveness result:", session_id, session_token, result);
//       if (data.statusCode == 200) {
//         if (data.body.Status == "SUCCEEDED") {
//           const _response = await fetch(
//             "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
//             {
//               method: "POST",
//               headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 session_id: session_id,
//                 session_token: session_token,
//                 image: data.body.ReferenceImage.Bytes,
//               }),
//             }
//           );

//           const _data = await _response.json();
//           console.log("data:::", _data);
//           if ((_data.status = 1)) {
//             document.getElementsByName("frm")[0].submit();
//           } else {
//             alert("❌ Failed to send image to the API.");
//           }
//         }
//       }
//       //
//       if (result.Confidence < 0.9) {
//         alert("Face not detected as live. Please try again with a real face.");
//       }

//       faceLivenessAnalysis(result);
//     } catch (err) {
//       console.error("Error fetching liveness results:", err);
//       alert("There was an error analyzing the face. Please try again.");
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <FaceLivenessDetector
//           sessionId={sessionId}
//           region="us-east-1"
//           onAnalysisComplete={handleAnalysisComplete}
//           onError={(error) => {
//             console.error(error);
//           }}
//         />
//       )}

//       <form
//         name="frm"
//         method="post"
//         action={"https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"}
//       >
//         <input
//           type="hidden"
//           id="session_id"
//           name="session_id"
//           value={session_id}
//         ></input>
//         <input
//           type="hidden"
//           id="session_token"
//           name="session_token"
//           value={session_token}
//         ></input>
//       </form>
//     </>
//   );
// }

// export default FaceLiveness;



import React, { useEffect, useState } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

function FaceLiveness({ faceLivenessAnalysis }) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const session_id = params.get("session_id");
  const session_token = params.get("session_token");

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [livenessSuccess, setLivenessSuccess] = useState(false); // NEW FLAG

  const endpoint = process.env.REACT_APP_ENV_API_URL || "";

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const response = await fetch(endpoint + "createfacelivenesssession");
      const data = await response.json();
      setSessionId(data.sessionId);
      setLoading(false);
    };
    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    try {
      const response = await fetch(endpoint + "getfacelivenesssessionresults", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionid: sessionId }),
      });

      const data = await response.json();
      const result = data.body;

      if (data.statusCode === 200 && result.Status === "SUCCEEDED") {
        const _response = await fetch(
          "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id,
              session_token,
              image: result.ReferenceImage.Bytes,
            }),
          }
        );

        const _data = await _response.json();
        if (_data.status === 1) {
          setLivenessSuccess(true); // Mark it successful for form rendering
          document.getElementsByName("frm")[0].submit();
        } else {
          alert("❌ Failed to send image to the API.");
        }
      }

      if (result.Confidence < 0.9) {
        alert("Face not detected as live. Please try again with a real face.");
      }

      faceLivenessAnalysis(result);
    } catch (err) {
      console.error("Error fetching liveness results:", err);
      alert("There was an error analyzing the face. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FaceLivenessDetector
          sessionId={sessionId}
          region="us-east-1"
          onAnalysisComplete={handleAnalysisComplete}
          onError={(error) => console.error(error)}
        />
      )}

      {livenessSuccess && (
        <form
          name="frm"
          method="post"
          action="https://vfseu.mioot.com/forms/UAT/PhotoVerify/submission/"
        >
          <input
            type="hidden"
            id="session_id"
            name="session_id"
            value={session_id}
          />
          <input
            type="hidden"
            id="session_token"
            name="session_token"
            value={session_token}
          />
        </form>
      )}
    </>
  );
}

export default FaceLiveness;
