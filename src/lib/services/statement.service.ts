type FetchStatementResponse = {
  requestId: string;
  tempUrl: string;
};

export async function fetchStatementUrl(): Promise<FetchStatementResponse> {
  // TODO: Replace with real API call
  // const { apiGet } = await import("@/lib/axios");
  // const { API } = await import("@/lib/api/urls");
  // const { cookies } = await import("next/headers");
  // const cookieStore = await cookies();
  // const userId = cookieStore.get("p2m-user-id")?.value;
  // const result = await apiGet<FetchStatementResponse>(API.bank.initiateFetch, {
  //   params: { user: userId },
  // });

  return {
    requestId: "MON0000000016",
    tempUrl:
      "https://aa.crednidhi.com/api/open?r=MON000000000016&k=hDbH4Ryyo01cLHSAVHTYdUJwIenOZxwU_dUEpi9ZagsA7Enf8j6cmr3Xk",
  };
}
