// import "./App.css";
// import React from "react";
// import { Amplify } from "aws-amplify";
// import { ThemeProvider } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import FaceLiveness from "./Components/FaceLiveness";
// import ReferenceImage from "./Components/ReferenceImage";
// import { View, Flex } from "@aws-amplify/ui-react";

// import awsexports from "./aws-exports";

// Amplify.configure(awsexports);

// function App() {
//   const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null);

//   const getfaceLivenessAnalysis = (faceLivenessAnalysis) => {
//     if (faceLivenessAnalysis !== null) {
//       setFaceLivenessAnalysis(faceLivenessAnalysis);
//     }
//   };

//   const tryagain = () => {
//     setFaceLivenessAnalysis(null);
//   };

//   return (
//     <ThemeProvider>
//       <Flex
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//         alignContent="flex-start"
//         wrap="nowrap"
//         gap="1rem"
//       >
//         <View
//           as="div"
//           maxHeight="600px"
//           height="600px"
//           width="740px"
//           maxWidth="740px"
//         >
//           {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
//             <ReferenceImage
//               faceLivenessAnalysis={faceLivenessAnalysis}
//               tryagain={tryagain}
//             ></ReferenceImage>
//           ) : (
//             <FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />
//           )}
//         </View>
//       </Flex>
//     </ThemeProvider>
//   );
// }

// export default App;
import "./App.css";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { ThemeProvider, View, Flex } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import FaceLiveness from "./Components/FaceLiveness";
import ReferenceImage from "./Components/ReferenceImage";
import awsexports from "./aws-exports";
import axios from "axios";

Amplify.configure(awsexports);

function App() {
  const [faceLivenessAnalysis, setFaceLivenessAnalysis] = React.useState(null);

  const getfaceLivenessAnalysis = (result) => {
    if (result !== null) {
      setFaceLivenessAnalysis(result);
    }
  };

  const tryagain = () => {
    setFaceLivenessAnalysis(null);
  };

  // ✅ Auto-send image to backend when result is ready
  useEffect(() => {
    const sendToAPI = async () => {
      if (
        faceLivenessAnalysis &&
        faceLivenessAnalysis.ReferenceImage &&
        faceLivenessAnalysis.Confidence >= 0.9
      ) {
        try {
          const apiEndpoint =
            "https://vfseu.mioot.com/forms/UAT/PhotoVerify/Test/";
          const imageBase64 =
            "data:image/jpeg;base64," +
            faceLivenessAnalysis.ReferenceImage.Bytes;

          const response = await axios.post(
            apiEndpoint,
            {
              image: imageBase64,
              sessionId: faceLivenessAnalysis.SessionId,
              confidence: faceLivenessAnalysis.Confidence,
            },
            {
              headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer YOUR_TOKEN" // if required
              },
            }
          );

          console.log("✅ Image auto-sent to API:", response.data);
        } catch (err) {
          console.error("❌ Auto-send failed:", err);
        }
      }
    };

    sendToAPI();
  }, [faceLivenessAnalysis]);

  return (
    <ThemeProvider>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
        <View
          as="div"
          maxHeight="600px"
          height="600px"
          width="740px"
          maxWidth="740px"
        >
          {faceLivenessAnalysis && faceLivenessAnalysis.Confidence ? (
            <ReferenceImage
              faceLivenessAnalysis={faceLivenessAnalysis}
              tryagain={tryagain}
            />
          ) : (
            <FaceLiveness faceLivenessAnalysis={getfaceLivenessAnalysis} />
          )}
        </View>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
