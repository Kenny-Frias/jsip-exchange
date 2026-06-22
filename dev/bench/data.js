window.BENCHMARK_DATA = {
  "lastUpdate": 1782136895560,
  "repoUrl": "https://github.com/Kenny-Frias/jsip-exchange",
  "entries": {
    "Order book benchmark": [
      {
        "commit": {
          "author": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "committer": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "distinct": true,
          "id": "404c62b0e18bd0e3e3a84a36a7c5c1c1e0478b74",
          "message": "Implemented is_more_aggressive, is_marketable, and find_match",
          "timestamp": "2026-06-18T20:48:18Z",
          "tree_id": "0108f7552eeddb89e6fbc22542634616228d216c",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/404c62b0e18bd0e3e3a84a36a7c5c1c1e0478b74"
        },
        "date": 1781815954210,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 307.5216197946049,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 1430.4846021289932,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 2773.472495406559,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 14542.970981138711,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 137.77394143130073,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 616.6433302348637,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1238.6099344137413,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 5602.567567803307,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 291.648172575856,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 1420.4980548958108,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 2818.3344501955007,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 13907.243117647742,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 1654.066388005792,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1772.6420917394244,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 7683.276385151,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 15487.155705953466,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 72957.8947022003,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 791.5339093683818,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 3464.8339141091205,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 6686.311152862397,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 31489.262573337113,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 7631.297103955943,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 134796.1543568853,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 518475.59716763895,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 2878.3680256210305,
            "unit": "ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "committer": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "distinct": true,
          "id": "68fe792826e50dab1d7f605dfa86917bbaa49b6b",
          "message": "Part 1 Excercises 1 & 2 complete",
          "timestamp": "2026-06-22T13:53:18Z",
          "tree_id": "43e9b74fa936ee9703b2b260ba9bbd420d2e502d",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/68fe792826e50dab1d7f605dfa86917bbaa49b6b"
        },
        "date": 1782136654843,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 254.12098917162365,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 1232.1850026914667,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 2472.040634903929,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 12265.890258289188,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 120.8308425496581,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 548.5783026682894,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1077.9571541834114,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 5394.974544187205,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 239.48341837548836,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 1116.9611233317905,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 2213.373867891104,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 10893.002928135356,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 1364.5406305447964,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1628.9214894247675,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 7184.779201859395,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 13484.72455547732,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 64981.540380084305,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 670.0473404669914,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 2884.3375142885257,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 5621.1266829857295,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 27499.727039501886,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 6618.82730630468,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 117442.76454832357,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 434781.9477158004,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 2456.195929430837,
            "unit": "ns"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "committer": {
            "email": "kf2792@columbia.edu",
            "name": "Kenny Frias",
            "username": "Kenny-Frias"
          },
          "distinct": true,
          "id": "54f6d0553f249a39529c2bfafd6b467b60d9f813",
          "message": "Merge remote-tracking branch 'upstream/main'",
          "timestamp": "2026-06-22T13:56:00Z",
          "tree_id": "8a407c4f392bf69ee8a4766a6fbb5c38bab81adc",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/54f6d0553f249a39529c2bfafd6b467b60d9f813"
        },
        "date": 1782136894675,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 255.46494127910148,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 1221.9049541830573,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 2473.26604192978,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 12222.222879975978,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 128.9777511513397,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 603.8412921806641,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1089.0306551219367,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 5328.72126526873,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 236.476101708389,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 1079.2672007210185,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 2111.864751449236,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 10419.296957138353,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 1329.4298630291266,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1568.6534919411476,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 6915.178408843046,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 13537.380976407361,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 61997.270465586356,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 690.0122261372549,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 2989.1538623273077,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 5800.857411612899,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 28220.485749777778,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 6730.617427383179,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 116476.29942402191,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 445075.80587627436,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 2438.2595177249323,
            "unit": "ns"
          }
        ]
      }
    ]
  }
}