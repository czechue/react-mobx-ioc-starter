import { CustomizationV2Api } from "../CustomizationV2ApiClient";

export const GetCustomizationSuccessResponse = (customizationId: string) => {
  const response: CustomizationV2Api.getCustomization.Response = {
    customizationId: customizationId,
    priceRange: {
      from: { value: 15, currency: "USD" },
      to: {
        value: 25,
        currency: "USD",
      },
    },
    priceSuggestion: { value: 20, currency: "USD" },
    variants: [
      {
        color: {
          name: "Milky way",
          swatch: "#a682ae",
        },
        photos: [
          {
            id: "photo1",
            url: "https://imgproxy.fourthwall.com/oqJlto3vIb_DViLGzm0ph50WcNa9bGVBNRaOd8dBFE4/w:1126/h:1500/aq:dssim:0.02:75:85/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3BzaG9wcHJvZC5hcHBzcG90LmNvbS9vL2NhdGFsb2clMkZwcm9fMjdlNmY3NjhmMjM3NDhhMTkzJTJGY3BpXzNmMWQwNjE0MTUwMzRiMzZiNyUyRkZXXzAyXzIwMjJfOTMxMy5qcGc_YWx0PW1lZGlhJnRva2VuPWI4MTE5ZjA4LWQxZDAtNGM3MC1iNTFjLWMwN2Q5ZjA4MWUxMw",
          },
        ],
      },
      {
        color: {
          name: "Navy / White",
          swatch: "#6da7ca",
        },
        photos: [
          {
            id: "photo2",
            url: "https://imgproxy.fourthwall.com/qBCU0kIduJJmynzu0ByHBhrYXbi_ARvVNzfDFqCgPQM/w:1126/h:1500/aq:dssim:0.02:75:85/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3BzaG9wcHJvZC5hcHBzcG90LmNvbS9vL2NhdGFsb2clMkZwcm9fMjdlNmY3NjhmMjM3NDhhMTkzJTJGY3BpXzNmMWQwNjE0MTUwMzRiMzZiNyUyRkZXXzAyXzIwMjJfOTE0NC5qcGc_YWx0PW1lZGlhJnRva2VuPTk5ZDU5MmQwLWRjYzMtNGI1MS05ZjkwLWU3MmNiMTQzNWNmYQ",
          },
        ],
      },
      {
        color: {
          name: "Classic rainbow",
          swatch: "#eee448",
        },
        photos: [
          {
            id: "photo3",
            url: "https://imgproxy.fourthwall.com/G-a3Rh8-L5N2uvrUP91akO-_flmajSCtlakBfuEa1vE/w:1126/h:1500/aq:dssim:0.02:75:85/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3BzaG9wcHJvZC5hcHBzcG90LmNvbS9vL2NhdGFsb2clMkZwcm9fMjdlNmY3NjhmMjM3NDhhMTkzJTJGY3BpXzNmMWQwNjE0MTUwMzRiMzZiNyUyRkZXXzAyXzIwMjJfOTA2OS5qcGc_YWx0PW1lZGlhJnRva2VuPTE3MjE0MjIyLTZhYjEtNDFiMS1iNjk1LWQyZWY5MDU0NWQ2MA",
          },
        ],
      },
      {
        color: {
          name: "Sherbet rainbow",
          swatch: "#ef8fbf",
        },
        photos: [
          {
            id: "photo4",
            url: "https://imgproxy.fourthwall.com/-wnC0FnfcAfgJltQdbcBYDiPYcri_mXxWoECHmNy1zY/w:1126/h:1500/aq:dssim:0.02:75:85/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3BzaG9wcHJvZC5hcHBzcG90LmNvbS9vL2NhdGFsb2clMkZwcm9fMjdlNmY3NjhmMjM3NDhhMTkzJTJGY3BpXzNmMWQwNjE0MTUwMzRiMzZiNyUyRkZXXzAyXzIwMjJfOTI0Ni5qcGc_YWx0PW1lZGlhJnRva2VuPTdiMDAxMmUzLWNjZDMtNGY5OC1hOTIzLWM5MTUwOWUxMGJjZQ",
          },
        ],
      },
      {
        color: {
          name: "Black / White",
          swatch: "#ffffff",
        },
        photos: [
          {
            id: "photo5",
            url: "https://imgproxy.fourthwall.com/eh69mnaLTwuyhX4yUTblgL86UrrUBt-GtiGOcTDm-Dc/w:1126/h:1500/aq:dssim:0.02:75:85/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3BzaG9wcHJvZC5hcHBzcG90LmNvbS9vL2NhdGFsb2clMkZwcm9fMjdlNmY3NjhmMjM3NDhhMTkzJTJGY3BpXzNmMWQwNjE0MTUwMzRiMzZiNyUyRkZXXzAyXzIwMjJfOTIyNS5qcGc_YWx0PW1lZGlhJnRva2VuPTMxMWEyODRmLWEzM2UtNDZlMS04ZDFmLTFhMjQzZmJjNjY0MA",
          },
        ],
      },
    ],
  };

  return response;
};
