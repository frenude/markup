import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import MarkNav from 'markdown-navbar';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkdownPreview from '@uiw/react-markdown-preview';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';
import './App.css'
import { Box, createStyles, Drawer, Grid, makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    flexGrow: 1,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(12),
    paddingLeft: theme.spacing(50),
    minHeight: 'calc(100% - 120px)',
  },
  drawer: {
    flexShrink: 0,
    width: 296,
    '& svg': {
      fontSize: "1.5rem"
    }
  },
  paper: {
    width: 296,
    overflowY: 'hidden',
  },


}));
function App() {
  const classes = useStyles();
  const [mdContent, setMdContent] = React.useState('')


  React.useEffect(() => {
    fetch("test.md")
      .then(res => res.text())
      .then(text => setMdContent(text));
  }, []);

  return (
    <div >
       <Drawer className={classes.drawer} variant={"permanent"} classes={{ paper: classes.paper }}>
        <Box >
          <MarkNav
            className="article"
            source={mdContent}
            headingTopOffset={40} //离顶部的距离
            ordered={false}   //是否显示标题题号1,2等
          />
        </Box>
      </Drawer>
      <main className={classes.main}>
        <Grid container justifyContent="center" alignItems="center">
          <Box width={"70%"}>
            <ReactMarkdown
              children={mdContent}
              remarkPlugins={[remarkGfm,remarkMath]}
              rehypePlugins={[rehypeRaw,rehypeKatex]} 
              className={"markdown-body"}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </Box>
        </Grid>
      </main>
    </div>
  );
};


export default App
