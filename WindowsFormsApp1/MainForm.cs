using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();

        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {
            System.Drawing.SolidBrush myBrush = new System.Drawing.SolidBrush(System.Drawing.Color.Black);
            Pen p = new Pen(myBrush);
            Graphics g = e.Graphics;
            Rectangle rect = new Rectangle(100, 100, 200, 300);
            g.FillRectangle(myBrush, rect);

            myBrush.Dispose();
            g.Dispose();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {

        }
    }
}
