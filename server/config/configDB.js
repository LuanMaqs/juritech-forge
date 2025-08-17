require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const connectionString = process.env.DATABASE_URL

const app = express();
const port = process.env.PORT || 3001;


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;