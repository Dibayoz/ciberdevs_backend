const express =  require('express'); 
//const task = require('../models/task');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks //task:tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});


// done

router.get('/turn/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    //console.log(task)
    //res.send('received')
    res.redirect('/') 

})

//Edit
router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});


// delete

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});


module.exports = router;