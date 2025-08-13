import { USAStateAbbreviation } from '../types/index';

/**
 * Optimized centroid coordinates for each state in the SVG coordinate system
 * These positions are adjusted to minimize overlap and improve readability
 */
const StateCentroids: Record<USAStateAbbreviation, { x: number; y: number }> = {
  "AL": {
    "x": 648,
    "y": 411
  },
  "AK": {
    "x": 116,
    "y": 489
  },
  "AZ": {
    "x": 195,
    "y": 360
  },
  "AR": {
    "x": 544,
    "y": 372
  },
  "CA": {
    "x": 66,
    "y": 275
  },
  "CO": {
    "x": 316,
    "y": 271
  },
  "CT": {
    "x": 859,
    "y": 175
  },
  "DC": {
    "x": 801,
    "y": 250
  },
  "DE": {
    "x": 828,
    "y": 245
  },
  "FL": {
    "x": 758,
    "y": 501
  },
  "GA": {
    "x": 715,
    "y": 410
  },
  "HI": {
    "x": 331,
    "y": 565
  },
  "ID": {
    "x": 185,
    "y": 149
  },
  "IL": {
    "x": 586,
    "y": 251
  },
  "IN": {
    "x": 645,
    "y": 248
  },
  "IA": {
    "x": 522,
    "y": 212
  },
  "KS": {
    "x": 440,
    "y": 289
  },
  "KY": {
    "x": 662,
    "y": 302
  },
  "LA": {
    "x": 545,
    "y": 456
  },
  "ME": {
    "x": 891,
    "y": 80
  },
  "MD": {
    "x": 795,
    "y": 239
  },
  "MA": {
    "x": 867,
    "y": 157
  },
  "MI": {
    "x": 657,
    "y": 171
  },
  "MN": {
    "x": 502,
    "y": 120
  },
  "MS": {
    "x": 595,
    "y": 413
  },
  "MO": {
    "x": 538,
    "y": 295
  },
  "MT": {
    "x": 272,
    "y": 85
  },
  "NE": {
    "x": 417,
    "y": 223
  },
  "NV": {
    "x": 131,
    "y": 233
  },
  "NH": {
    "x": 867,
    "y": 135
  },
  "NJ": {
    "x": 837,
    "y": 225
  },
  "NM": {
    "x": 296,
    "y": 372
  },
  "NY": {
    "x": 811,
    "y": 157
  },
  "NC": {
    "x": 778,
    "y": 330
  },
  "ND": {
    "x": 414,
    "y": 91
  },
  "OH": {
    "x": 699,
    "y": 237
  },
  "OK": {
    "x": 459,
    "y": 355
  },
  "OR": {
    "x": 94,
    "y": 121
  },
  "PA": {
    "x": 778,
    "y": 211
  },
  "RI": {
    "x": 876,
    "y": 172
  },
  "SC": {
    "x": 753,
    "y": 374
  },
  "SD": {
    "x": 410,
    "y": 159
  },
  "TN": {
    "x": 648,
    "y": 341
  },
  "TX": {
    "x": 423,
    "y": 445
  },
  "UT": {
    "x": 213,
    "y": 251
  },
  "VT": {
    "x": 845,
    "y": 118
  },
  "VA": {
    "x": 778,
    "y": 282
  },
  "WA": {
    "x": 116,
    "y": 49
  },
  "WV": {
    "x": 739,
    "y": 273
  },
  "WI": {
    "x": 576,
    "y": 151
  },
  "WY": {
    "x": 296,
    "y": 180
  }
};

export { StateCentroids }; 
