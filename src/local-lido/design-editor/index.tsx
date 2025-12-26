import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";

/* ================= TYPES ================= */

export type GetFontQuery = {
  q?: string;
  offset?: string;
  limit?: string;
};

type EditorState = {
  data: any;
  history: any[];
  index: number;
};

/* ================= CONTEXT ================= */

const EditorContext = createContext<any>(null);

/* ================= PROVIDER ================= */

// export const Editor = ({ children }: { children: React.ReactNode }) => {
//   const state = useRef<EditorState>({
//     data: {},
//     history: [],
//     index: -1,
//   });

//   const setData = useCallback((data: any) => {
//     state.current.data = data;
//     state.current.history.push(data);
//     state.current.index++;
//   }, []);

//   const undo = () => {
//     if (state.current.index > 0) state.current.index--;
//   };

//   const redo = () => {
//     if (state.current.index < state.current.history.length - 1) {
//       state.current.index++;
//     }
//   };

//   const actions = {
//     setData,
//     history: { undo, redo },
//   };

//   const query = {
//     serialize: () => state.current.data,
//     history: {
//       canUndo: () => state.current.index > 0,
//       canRedo: () =>
//         state.current.index < state.current.history.length - 1,
//     },
//   };

//   return (
//     <EditorContext.Provider value={{ actions, query }}>
//       {children}
//     </EditorContext.Provider>
//   );
// };

type EditorConfig = {
  assetPath?: string;
  frame?: {
    defaultImage?: {
      url: string;
      width: number;
      height: number;
    };
  };
};

type EditorProps = {
  children: React.ReactNode;
  config?: EditorConfig;
  getFonts?: (query: any) => Promise<any[]>;
  uploadImage?: (file: File) => Promise<any>;
};

export const Editor = ({
  children,
  config,
  getFonts,
  uploadImage,
}: EditorProps) => {
  const state = useRef<EditorState>({
    data: {},
    history: [],
    index: -1,
  });

  // Store props for future use (no-op for now)
  const editorConfig = config;
  const fontsApi = getFonts;
  const uploadApi = uploadImage;

  const setData = useCallback((data: any) => {
    state.current.data = data;
    state.current.history.push(data);
    state.current.index++;
  }, []);

  const undo = () => {
    if (state.current.index > 0) state.current.index--;
  };

  const redo = () => {
    if (state.current.index < state.current.history.length - 1) {
      state.current.index++;
    }
  };

  const actions = {
    setData,
    history: { undo, redo },
  };

  const query = {
    serialize: () => state.current.data,
    history: {
      canUndo: () => state.current.index > 0,
      canRedo: () =>
        state.current.index < state.current.history.length - 1,
    },
  };

  return (
    <EditorContext.Provider
      value={{
        actions,
        query,
        config: editorConfig,
        getFonts: fontsApi,
        uploadImage: uploadApi,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

/* ================= HOOKS ================= */

export const useEditor = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor must be used inside <Editor>");
  }
  return ctx;
};

export const useSelectedLayers = () => {
  return {
    selectedLayerIds: [],
  };
};

/* ================= COMPONENT STUBS ================= */

export const PageControl = () => null;

export const DesignFrame = ({
  children,
}: {
  children?: React.ReactNode;
}) => <div style={{ flex: 1 }}>{children}</div>;

export const Preview = () => <div>Preview</div>;

export const LayerSettings = () => null;
