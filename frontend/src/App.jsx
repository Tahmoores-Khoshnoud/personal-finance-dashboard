import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function App() {
  // Backend status
  const [message, setMessage] = useState('Checking backend...');
  // Transactions state (simple in-memory data for now)
  const [tx, setTx] = useState([]);
  // Simple form fields
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    refreshHealth();
    // preload a few demo items
    setTx([
      { id: 1, desc: 'Coffee', amount: -4.5 },
      { id: 2, desc: 'Groceries', amount: -56.2 },
      { id: 3, desc: 'Salary', amount: 1800 }
    ]);
  }, []);

  const refreshHealth = () => {
    fetch('/api/health')
      .then(r => r.text())
      .then(setMessage)
      .catch(() => setMessage('Failed to reach backend'));
  };

  const addTx = () => {
    if (!desc.trim() || isNaN(Number(amount))) return;
    const newItem = {
      id: Date.now(),
      desc: desc.trim(),
      amount: Number(amount)
    };
    setTx(prev => [newItem, ...prev]);
    setDesc('');
    setAmount('');
  };

  const removeTx = (id) => {
    setTx(prev => prev.filter(t => t.id !== id));
  };

  const clearAll = () => setTx([]);

  const balance = tx.reduce((s, t) => s + t.amount, 0);
  const income = tx.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = tx.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">Personal Finance Dashboard</Typography>
          <Box sx={{ ml: 'auto' }}>
            <Button color="inherit" onClick={refreshHealth}>Refresh Health</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 6 }}>
        <Grid container spacing={3}>
          {/* SUMMARY */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Summary</Typography>
                <Typography>Backend: {message}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography><b>Balance:</b> ${balance.toFixed(2)}</Typography>
                <Typography color="success.main"><b>Income:</b> ${income.toFixed(2)}</Typography>
                <Typography color="error.main"><b>Expense:</b> ${expense.toFixed(2)}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setTx(prev => [{ id: Date.now(), desc: 'Demo Item', amount: -12.34 }, ...prev])}>
                  Add Demo
                </Button>
                <Button size="small" color="warning" onClick={clearAll}>
                  Clear All
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* QUICK ADD */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Add Transaction</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Amount (use negative for expense)"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button fullWidth variant="contained" onClick={addTx} sx={{ height: '56px' }}>
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* TRANSACTIONS LIST */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                <List dense>
                  {tx.length === 0 && (
                    <Typography color="text.secondary">No transactions yet. Use “Add” or “Add Demo”.</Typography>
                  )}
                  {tx.map(item => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        secondaryAction={
                          <Button size="small" color="error" onClick={() => removeTx(item.id)}>Delete</Button>
                        }
                      >
                        <ListItemText
                          primary={item.desc}
                          secondary={`Amount: $${item.amount.toFixed(2)}`}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
