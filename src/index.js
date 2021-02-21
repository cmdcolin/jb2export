import "regenerator-runtime/runtime";

import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";
import {
  createViewState,
  createJBrowseTheme,
  JBrowseLinearGenomeView,
  ThemeProvider,
} from "@jbrowse/react-linear-genome-view";
import { renderToSvg } from "@jbrowse/plugin-linear-genome-view";

// const theme = createJBrowseTheme();

const assembly = {
  name: "GRCh38",
  sequence: {
    type: "ReferenceSequenceTrack",
    trackId: "GRCh38-ReferenceSequenceTrack",
    adapter: {
      type: "BgzipFastaAdapter",
      fastaLocation: {
        uri: "https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz",
      },
      faiLocation: {
        uri: "https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.fai",
      },
      gziLocation: {
        uri: "https://jbrowse.org/genomes/GRCh38/fasta/hg38.prefix.fa.gz.gzi",
      },
    },
  },
  aliases: ["hg38"],
  refNameAliases: {
    adapter: {
      type: "RefNameAliasAdapter",
      location: {
        uri:
          "https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/hg38_aliases.txt",
      },
    },
  },
};

const tracks = [
  {
    type: "FeatureTrack",
    trackId: "repeats_hg38",
    name: "Repeats",
    assemblyNames: ["hg38"],
    category: ["Annotation"],
    adapter: {
      type: "BigBedAdapter",
      bigBedLocation: {
        uri: "https://jbrowse.org/genomes/GRCh38/repeats.bb",
      },
    },
  },
  {
    type: "FeatureTrack",
    trackId: "ncbi_refseq_109_hg38",
    name: "NCBI RefSeq (GFF3Tabix)",
    assemblyNames: ["GRCh38"],
    category: ["Annotation"],
    adapter: {
      type: "Gff3TabixAdapter",
      gffGzLocation: {
        uri:
          "https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz",
      },
      index: {
        location: {
          uri:
            "https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/ncbi_refseq/GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff.gz.tbi",
        },
      },
    },
  },
  {
    type: "QuantitativeTrack",
    trackId: "hg38.100way.phyloP100way",
    name: "hg38.100way.phyloP100way",
    category: ["Conservation"],
    assemblyNames: ["hg38"],
    adapter: {
      type: "BigWigAdapter",
      bigWigLocation: {
        uri:
          "http://hgdownload.cse.ucsc.edu/goldenpath/hg38/phyloP100way/hg38.phyloP100way.bw",
      },
    },
  },
  {
    type: "FeatureTrack",
    trackId: "clinGenGeneDisease",
    name: "ClinGen Gene-Disease mapping",
    assemblyNames: ["hg38"],
    category: ["ClinGen"],
    adapter: {
      type: "BigBedAdapter",
      bigBedLocation: {
        uri:
          "https://hgdownload.soe.ucsc.edu/gbdb/hg38/bbi/clinGen/clinGenGeneDisease.bb",
      },
    },
  },
];

const defaultSession = {
  name: "My session",
  view: {
    id: "linearGenomeView",
    type: "LinearGenomeView",
    offsetPx: 752150,
    bpPerPx: 25.084820116171613,
    displayedRegions: [
      { assemblyName: "hg38", refName: "1", start: 0, end: 248956422 },
    ],
    tracks: [
      {
        id: "MYkD7Sl3E",
        type: "FeatureTrack",
        configuration: "ncbi_refseq_109_hg38",
        displays: [
          {
            id: "eKHbYEqbSZ",
            type: "LinearBasicDisplay",
            height: 218,
            configuration: "ncbi_refseq_109_hg38-LinearBasicDisplay",
          },
        ],
      },
      {
        id: "RmEVOSCDv",
        type: "FeatureTrack",
        configuration: "clinGenGeneDisease",
        displays: [
          {
            id: "sXi9Yt_n7f",
            type: "LinearBasicDisplay",
            height: 100,
            configuration: "clinGenGeneDisease-LinearBasicDisplay",
          },
        ],
      },
      {
        id: "gTxauXvlF",
        type: "QuantitativeTrack",
        configuration: "hg38.100way.phyloP100way",
        displays: [
          {
            id: "xYlBLNTFi3",
            type: "LinearWiggleDisplay",
            height: 100,
            configuration: "hg38.100way.phyloP100way-LinearWiggleDisplay",
            selectedRendering: "",
            resolution: 5,
            constraints: {},
          },
        ],
      },
    ],
  },
};

(async () => {
  try {
    const state = createViewState({
      assembly,
      tracks,
      defaultSession,
    });
    state.session.view.setWidth(1000);
    console.time("duration");
    const start = +Date.now();
    console.log(await renderToSvg(state.session.view));
    console.error(`Finished rendering: ${(+Date.now() - start) / 1000}s`);
  } catch (e) {
    console.error(e);
  }
})();
