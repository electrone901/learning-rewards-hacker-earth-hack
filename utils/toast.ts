export function toastVerifySuccess(toast: any) {
  toast({
    title: "Verification success!",
    description: "We've successfully verified your quest task.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
}

export function toastVerifyFailure(toast: any) {
  toast({
    title: "Verification failed.",
    description: "We're unable to verify your completion.",
    status: "error",
    duration: 5000,
    isClosable: true,
  });
}

export function toastClaimSuccess(toast: any) {
  toast({
    title: "Claim success!",
    description: "We've successfully airdropped your reward.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
}

export function toastClaimFailure(toast: any) {
  toast({
    title: "Claim failed.",
    description: "Oops, claim failed. Please standby.",
    status: "error",
    duration: 5000,
    isClosable: true,
  });
}
