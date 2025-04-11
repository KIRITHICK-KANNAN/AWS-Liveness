// import React from "react";
// import "@aws-amplify/ui-react/styles.css";

// import { Alert, Image, useTheme, Button } from "@aws-amplify/ui-react";

// function ReferenceImage({ faceLivenessAnalysis, tryagain }) {
//   const { tokens } = useTheme();
//   return (
//     <>
//       <img
//         src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
//         alt="logo"
//         style="max-width: 100%; height: auto; width: 10%;"
//       />
//       <Alert
//         variation="info"
//         isDismissible={false}
//         hasIcon={false}
//         marginTop={tokens.space.large}
//       >
//         Session ID: {faceLivenessAnalysis.SessionId}
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Status: {faceLivenessAnalysis.Status}
//       </Alert>
//       <Alert variation="info" isDismissible={false} hasIcon={false}>
//         Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
//       </Alert>

//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.large}
//         marginBottom={tokens.space.large}
//         onClick={tryagain}
//       >
//         Try Again
//       </Button>
//       {/*
//       <Button
//         variation="primary"
//         type="submit"
//         marginTop={tokens.space.large}
//         marginBottom={tokens.space.large}
//         onClick={tryagain}
//       >
//         Try Again
//       </Button> */}
//       <Image
//         src={
//           "data:image/jpeg;base64," + faceLivenessAnalysis.ReferenceImage.Bytes
//         }
//         width="100%"
//         height="100%"
//         objectFit="cover"
//         objectPosition="50% 50%"
//       />
//     </>
//   );
// }

// export default ReferenceImage;

import React from "react";
import "@aws-amplify/ui-react/styles.css";
import { Alert, Image, useTheme, Button } from "@aws-amplify/ui-react";

function ReferenceImage({ faceLivenessAnalysis, tryagain }) {
  const { tokens } = useTheme();

  return (
    <>
      <img
        src="https://vfseu.mioot.com/forms/DEV/ITSLT/Design/Dha_Appointment/img/vfs_logo3.png"
        alt="logo"
        style={{ maxWidth: "100%", height: "auto", width: "10%" }}
      />
      <Alert
        variation="info"
        isDismissible={false}
        hasIcon={false}
        marginTop={tokens.space.large}
      >
        Session ID: {faceLivenessAnalysis.SessionId}
      </Alert>
      <Alert variation="info" isDismissible={false} hasIcon={false}>
        Status: {faceLivenessAnalysis.Status}
      </Alert>
      <Alert variation="info" isDismissible={false} hasIcon={false}>
        Confidence Score: {faceLivenessAnalysis.Confidence.toFixed(2)}%
      </Alert>

      <Button
        variation="primary"
        type="submit"
        marginTop={tokens.space.large}
        marginBottom={tokens.space.large}
        onClick={tryagain}
      >
        Try Again
      </Button>

      <Image
        src={`data:image/jpeg;base64,${faceLivenessAnalysis.ReferenceImage.Bytes}`}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="50% 50%"
      />
    </>
  );
}

export default ReferenceImage;
