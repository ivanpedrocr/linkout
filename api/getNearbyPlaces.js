import { GOOGLE_MAPS_API_KEY } from "@env";

export const getNearbyPlaces = async (onFetch, onError, location, radius) => {
  if (location.latitude && location.longitude) {
    const queryVariables = {
      fields: ["formatted_address", "geometry", "name", "type"],
      keyword: "parks or courts",
      location: `${location.latitude},${location.longitude}`,
      radius,
      key: GOOGLE_MAPS_API_KEY,
    };
    const parsedVariables = new URLSearchParams(queryVariables).toString();
    const requestURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parsedVariables}`;
    const res = await fetch(requestURL);
    res
      .json()
      .then((places) => {
        onFetch?.(parseSearchResults(places.results));
      })
      .catch((error) => {
        console.log({ error });
        onError?.(error);
      });
  }
};

const parseSearchResults = (results) => {
  return results.map((place) => ({
    location: {
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    },
    address: place.vicinity,
    name: place.name,
    id: place.place_id,
  }));
};

const mockRes = {
  html_attributions: [],
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7845684,
          lng: -80.13808829999999,
        },
        viewport: {
          northeast: {
            lat: 25.78593727989272,
            lng: -80.1355215,
          },
          southwest: {
            lat: 25.78323762010728,
            lng: -80.1389439,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
      icon_background_color: "#4DB546",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
      name: "Flamingo Park Paddle/Racquetball Courts",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJx_LUFYy02YgR6QdtAQaetb8",
      plus_code: {
        compound_code: "QVM6+RQ Miami Beach, Florida",
        global_code: "76QXQVM6+RQ",
      },
      rating: 4.8,
      reference: "ChIJx_LUFYy02YgR6QdtAQaetb8",
      scope: "GOOGLE",
      types: ["park", "point_of_interest", "establishment"],
      user_ratings_total: 5,
      vicinity: "1300 Meridian Ave, Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7971202,
          lng: -80.13620399999999,
        },
        viewport: {
          northeast: {
            lat: 25.79846937989272,
            lng: -80.13485252010729,
          },
          southwest: {
            lat: 25.79576972010728,
            lng: -80.13755217989272,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/civic_building-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/civic-bldg_pinlet",
      name: "Miami Beach Parks Division",
      photos: [
        {
          height: 2448,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/109949178443669086996"\u003eMiroslav Kostelňák\u003c/a\u003e',
          ],
          photo_reference:
            "AeJbb3dj9mLlDhcpZsqnbfJ1IV1RGZC1LDEiV6clkkbnHsxu4G5T3hlPeJMPeYzaB1lToPRw59XE5oW3H9D1iI2ZxTkBpBx_UJmKRCE08sRlRKfNTVXtbxrph_D_aVqRBxhr8wFyCHTqlXZtu_wEF9vAL90X0bUFux3IErm26juCm7icss4w",
          width: 3264,
        },
      ],
      place_id: "ChIJMdtKy4O02YgROfAp0d_jVhw",
      plus_code: {
        compound_code: "QVW7+RG Miami Beach, Florida",
        global_code: "76QXQVW7+RG",
      },
      rating: 4,
      reference: "ChIJMdtKy4O02YgROfAp0d_jVhw",
      scope: "GOOGLE",
      types: [
        "local_government_office",
        "park",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 5,
      vicinity: "2100 Meridian Ave, Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7928422,
          lng: -80.13537769999999,
        },
        viewport: {
          northeast: {
            lat: 25.79419227989272,
            lng: -80.13379697010727,
          },
          southwest: {
            lat: 25.79149262010728,
            lng: -80.13649662989272,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/civic_building-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/civic-bldg_pinlet",
      name: "Miami Beach: Parks and Recreation Department",
      opening_hours: {
        open_now: false,
      },
      place_id: "ChIJ2-eMCvO02YgRn6MjF45bO4Q",
      plus_code: {
        compound_code: "QVV7+4R Miami Beach, Florida",
        global_code: "76QXQVV7+4R",
      },
      rating: 1,
      reference: "ChIJ2-eMCvO02YgRn6MjF45bO4Q",
      scope: "GOOGLE",
      types: ["local_government_office", "point_of_interest", "establishment"],
      user_ratings_total: 1,
      vicinity: "1701 Meridian Ave #401, Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7842667,
          lng: -80.1379563,
        },
        viewport: {
          northeast: {
            lat: 25.78563407989272,
            lng: -80.13557505,
          },
          southwest: {
            lat: 25.78293442010727,
            lng: -80.13875005000001,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Flamingo park Basketball Field",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1920,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/113185488607677364097"\u003eNicholas Sagion\u003c/a\u003e',
          ],
          photo_reference:
            "AeJbb3ezgpMq4RiH4ZNIKn8aURN-JxA4YVjZiHyE4e3FLex4ptCG0YPFRhBW_1RqeJ226pQC29fZ_zyfWQ26SsLn8vqJQ4htUwhpxcsNfTQvEoG2-vGN6iXZUfFVFtOk_LQ6VI8C0W3O0O0ee-0m3conglTSSumbyH_jSiMgAGdDLDELyVE2",
          width: 1080,
        },
      ],
      place_id: "ChIJTWjpck212YgRXiTeBkxMduA",
      plus_code: {
        compound_code: "QVM6+PR Miami Beach, Florida",
        global_code: "76QXQVM6+PR",
      },
      rating: 4.9,
      reference: "ChIJTWjpck212YgRXiTeBkxMduA",
      scope: "GOOGLE",
      types: ["point_of_interest", "establishment"],
      user_ratings_total: 7,
      vicinity: "1200 Meridian Ave, Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7940829,
          lng: -80.13588039999999,
        },
        viewport: {
          northeast: {
            lat: 25.79542557989272,
            lng: -80.13492422010727,
          },
          southwest: {
            lat: 25.79272592010728,
            lng: -80.13762387989271,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
      icon_background_color: "#4DB546",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
      name: "Miami Beach Convention Center Park",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/111258932329672173033"\u003eDivy Vasal\u003c/a\u003e',
          ],
          photo_reference:
            "AeJbb3eXDlXiRja8b4l2A5nIdFd5GlLO6LBxauS_jJ0pz-ktEZTJeWP_zyL-qW3W3XzPxcMRFq3O2j3LppLy2BFv4NB86ivSM9RrBF7B57jD-MhLWg-r6ipxwa-ZWsqXzJrPhV6Wjr45GdWdEW3IyF9JYbgG2tre-Cn2yjvdJVpV8H7cjLmO",
          width: 3024,
        },
      ],
      place_id: "ChIJWXdBfLe12YgR-zmiUhri0WU",
      plus_code: {
        compound_code: "QVV7+JJ Miami Beach, Florida",
        global_code: "76QXQVV7+JJ",
      },
      rating: 4.4,
      reference: "ChIJWXdBfLe12YgR-zmiUhri0WU",
      scope: "GOOGLE",
      types: ["park", "point_of_interest", "establishment"],
      user_ratings_total: 7,
      vicinity: "1809 Meridian Ave, Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7847251,
          lng: -80.13792189999999,
        },
        viewport: {
          northeast: {
            lat: 25.78607492989272,
            lng: -80.13657207010728,
          },
          southwest: {
            lat: 25.78337527010728,
            lng: -80.13927172989271,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Handball Courts",
      opening_hours: {
        open_now: true,
      },
      place_id: "ChIJtyRkojK12YgRUsHV8uRK79E",
      plus_code: {
        compound_code: "QVM6+VR Miami Beach, Florida",
        global_code: "76QXQVM6+VR",
      },
      rating: 5,
      reference: "ChIJtyRkojK12YgRUsHV8uRK79E",
      scope: "GOOGLE",
      types: ["point_of_interest", "establishment"],
      user_ratings_total: 4,
      vicinity: "Miami Beach",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 25.7971165,
          lng: -80.12915959999999,
        },
        viewport: {
          northeast: {
            lat: 25.79837217989272,
            lng: -80.12752582010728,
          },
          southwest: {
            lat: 25.79567252010728,
            lng: -80.13022547989273,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
      icon_background_color: "#4DB546",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet",
      name: "Collins Park",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3006,
          html_attributions: [
            '\u003ca href="https://maps.google.com/maps/contrib/117732184406324238477"\u003eandrea galvan\u003c/a\u003e',
          ],
          photo_reference:
            "AeJbb3eQmA55vjYNimzWS5oPex0fPq5gbbZQ0TgnqB8K0SOvw7v3_19m5lX1LbQBnZktD4uE2d9lfPABSLldPQ9NxbJAAURt8U1w9pt5xDQPi94LdK2tgY2b6fprtk0u2c8O3RgRVWQsWHNH8MsCA4g9kNkbgj0uZtTyRZmNCeUVaVtIIeDx",
          width: 5344,
        },
      ],
      place_id: "ChIJo-Cks5202YgRMxsaDBmt1Qo",
      plus_code: {
        compound_code: "QVWC+R8 Miami Beach, Florida",
        global_code: "76QXQVWC+R8",
      },
      rating: 4.6,
      reference: "ChIJo-Cks5202YgRMxsaDBmt1Qo",
      scope: "GOOGLE",
      types: [
        "park",
        "tourist_attraction",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 3119,
      vicinity: "2100 Collins Ave, Miami Beach",
    },
  ],
  status: "OK",
};
