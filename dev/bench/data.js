window.BENCHMARK_DATA = {
  "lastUpdate": 1782754563742,
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
          "id": "7ca659ae840a24ab024d9875fe79f54cc8437eb2",
          "message": "fixed test cases for order book & completed excercise 8 + 10",
          "timestamp": "2026-06-24T15:03:43Z",
          "tree_id": "4c03dc0a7b4dcc788ea6ea67d448b7ecef629cb0",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/7ca659ae840a24ab024d9875fe79f54cc8437eb2"
        },
        "date": 1782313685202,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 32.77310267465294,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 100.18339503893209,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 184.78389257309425,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 887.4791950541004,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 117.17464728569394,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 574.1451713389188,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1147.525345977167,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 5934.892056430002,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 103.77606044310367,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 410.2758075447889,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 848.8176182470313,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 4240.408502544933,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 514.6222502517278,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 928.269782957257,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 2797.2016271452385,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 4711.551983216921,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 20122.950873099926,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 363.54330567822274,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 1535.5391768744578,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3065.393120567536,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 14872.725418494709,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 4451.9759791972265,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 49699.051558854844,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 163742.1057623823,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 180.93835658140705,
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
          "id": "0616f47abdeb4477e05679a86c484279c7940147",
          "message": "Promoted order book tests",
          "timestamp": "2026-06-24T15:31:34Z",
          "tree_id": "41a98c2594bd8afc74ff307e1389f0608db4ee98",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/0616f47abdeb4477e05679a86c484279c7940147"
        },
        "date": 1782315368828,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 40.13769152926929,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 102.80433370517768,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 181.59854645263857,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 901.3167790303153,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 135.85485087732584,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 634.9590869069254,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1265.8021490659874,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 6206.381198459248,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 116.41482856868477,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 476.75103376041886,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 940.3458015831866,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 4609.611909506649,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 538.8181235073314,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1014.1643939692965,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 3065.6782925632415,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 4771.558127046249,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 22394.301735145968,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 467.8271959969949,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 1787.2332254600572,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3351.1995701606097,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 15639.509566669612,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 4942.037150432203,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 54464.1954775429,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 179261.27677982894,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 182.29947399379878,
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
          "id": "984833c1ad4c824942c8765566ee648b8961be08",
          "message": "part2 1b",
          "timestamp": "2026-06-25T19:20:26Z",
          "tree_id": "81979195893fede59a952baf8ccefdcc5be62dd3",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/984833c1ad4c824942c8765566ee648b8961be08"
        },
        "date": 1782415507425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 40.77053908257445,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 101.78615722008875,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 183.72139832168028,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 922.276825382165,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 138.17172220427176,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 653.4778883481192,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1270.0966517087786,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 6307.1997358364615,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 122.41828676838921,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 484.4788786365133,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 996.5488593358476,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 4917.497577940695,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 536.9058896376358,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1023.3646846623615,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 2886.7280689840404,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 5052.848549050252,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 21193.57536083463,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 465.2569624544562,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 1790.5304857694834,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3428.2619254093024,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 16487.901039955555,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 5036.736362178727,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 54359.01999093855,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 173797.89083642088,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 181.91718353727782,
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
          "id": "1476ed9246cfa9cbf9c5ac5e7150911aeebb70ef",
          "message": "exercise part2 1c",
          "timestamp": "2026-06-26T15:47:54Z",
          "tree_id": "4ae509cdb1bf9d764bac09a2d6b81323efe98087",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/1476ed9246cfa9cbf9c5ac5e7150911aeebb70ef"
        },
        "date": 1782489114943,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 45.387296781224414,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 106.65575695418904,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 191.22447525371584,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 931.1665097831195,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 148.9976846147302,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 681.9117150780613,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1349.6372199157004,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 6576.80587811545,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 126.63849108759376,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 528.5133341108318,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 1033.0992826792133,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 5402.8381670202325,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 570.1143068693544,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1069.3546723168686,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 3375.1784970518443,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 5935.1238255539,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 26606.231021255167,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 523.8467563123338,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 1991.7290672377376,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3671.26368214262,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 17220.61258388991,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 5319.739976145837,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 61147.58412963436,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 187556.9860437512,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 187.41401749049842,
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
          "id": "a4b71a4692218ee36f7ea5cc88bac8eef48bcd4b",
          "message": "E2 Part d",
          "timestamp": "2026-06-29T15:08:02Z",
          "tree_id": "d3732a16e0fcb808e8db6ba714ba2f69749d67d6",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/a4b71a4692218ee36f7ea5cc88bac8eef48bcd4b"
        },
        "date": 1782745918063,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 43.21498721643062,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 110.49452147922545,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 200.3817884078971,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 950.3349302004424,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 137.97382040357928,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 613.2262307159733,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1221.0658540026068,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 6146.181155234304,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 117.65822342553847,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 472.7252528141204,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 925.8219582247788,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 4540.987263027338,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 534.8021615390865,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 1030.407878085779,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 2789.273647537653,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 4819.862709871564,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 20831.694135762293,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 456.07580736633804,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 1733.88191276522,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3347.025389666686,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 16395.718448546966,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 5265.161102747133,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 55870.692977118415,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 167440.2121316812,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 195.2324803763398,
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
          "id": "3c1b06bf2f05730ad6a900628a82b80bd49ef808",
          "message": "Added registry to prevent dupe client_order_ids",
          "timestamp": "2026-06-29T17:32:06Z",
          "tree_id": "051ad70dcc3c8d161a323a7124b77af75ef497ed",
          "url": "https://github.com/Kenny-Frias/jsip-exchange/commit/3c1b06bf2f05730ad6a900628a82b80bd49ef808"
        },
        "date": 1782754562769,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "find_match (n=10)",
            "value": 42.364993514169704,
            "unit": "ns"
          },
          {
            "name": "find_match (n=50)",
            "value": 107.08435435912689,
            "unit": "ns"
          },
          {
            "name": "find_match (n=100)",
            "value": 193.74805838499503,
            "unit": "ns"
          },
          {
            "name": "find_match (n=500)",
            "value": 935.4278504742035,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=10)",
            "value": 132.6448574373915,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=50)",
            "value": 603.1172332201065,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=100)",
            "value": 1187.7045439751737,
            "unit": "ns"
          },
          {
            "name": "find_match_miss (n=500)",
            "value": 5980.335016947957,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=10)",
            "value": 121.73255680431681,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=50)",
            "value": 495.43682552189165,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=100)",
            "value": 976.1789325337214,
            "unit": "ns"
          },
          {
            "name": "best_bid_offer (n=500)",
            "value": 4409.371236542826,
            "unit": "ns"
          },
          {
            "name": "add+remove (n=100)",
            "value": 529.647791843163,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=10)",
            "value": 2306118.4302690094,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=50)",
            "value": 3479369.206065035,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=100)",
            "value": 4384266.337941629,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_cross (n=500)",
            "value": 5134781.6915996885,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=10)",
            "value": 2870527.372745378,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=50)",
            "value": 3205725.1525150915,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=100)",
            "value": 3422278.223967849,
            "unit": "ns"
          },
          {
            "name": "submit_ioc_miss (n=500)",
            "value": 3672853.5287732454,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_10_levels",
            "value": 81153363.75714286,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_50_levels",
            "value": 407847813.0714286,
            "unit": "ns"
          },
          {
            "name": "submit_sweep_100_levels",
            "value": 848389720.8,
            "unit": "ns"
          },
          {
            "name": "find_match_alloc (n=100)",
            "value": 191.91343304711324,
            "unit": "ns"
          }
        ]
      }
    ]
  }
}