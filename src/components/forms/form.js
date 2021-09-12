import React, {useState, useEffect} from 'react';
import useStyles from './style';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
   //get the current id
const Form = ({currentId, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state)=> currentId ? state.posts.find((p) => p._id === currentId) : null);

    const [postData, setpostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if (post) setpostData(post);
    }, [post]);

    const handleSubmit = async (e)=>{
       e.preventDefault();
          
        if(currentId){
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        }
        else{
          dispatch(createPost({ ...postData, name: user?.result?.name}));
        }
       
        clear();
    };

    if(!user?.result?.name){
      return(
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to Share your Paintings and also like other's Paintings
            </Typography>
        </Paper>
      )
    }

    const clear = ()=>{
         setCurrentId(null);
         setpostData({
          title:'',
          message:'',
          tags:'',
          selectedFile:'',
      })
    }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
              <Typography variant="h6">{currentId ? 'Edit ' : 'Share'} your Painting</Typography>
              <TextField variant ="outlined" name="title" label="Title"  value={postData.title} onChange={(e)=> setpostData({...postData, title: e.target.value})} fullWidth/>
              <TextField variant ="outlined" name="message" label="Message"  value={postData.message} onChange={(e)=> setpostData({...postData, message: e.target.value})} fullWidth/>
              <TextField variant ="outlined" name="tags" label="Tags"  value={postData.tags} onChange={(e)=> setpostData({...postData, tags: e.target.value.split(',')})} fullWidth/>
              <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=> setpostData({...postData, selectedFile: base64})}/>
              </div>
              <Button className={classes.buttonSubmit} variant="contained" color="primary" size ="large" type="submit" fullWidth>Submit</Button>
              <Button variant="contained" color="secondary" size ="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;