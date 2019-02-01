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
        Image GroteZwarteDriehoek = Image.FromFile(@"..\..\Resources\GroteZwarteDriehoek.png");

        public MainForm()
        {
            InitializeComponent();
            
        }
        
        private void panel1_Paint(object sender, PaintEventArgs e)
        {
            System.Drawing.SolidBrush myBrush = new System.Drawing.SolidBrush(System.Drawing.Color.Black);
            Pen p = new Pen(myBrush);
            Graphics g = e.Graphics;
            g.DrawLine(p, new Point(100,100), new Point(300, 200));
            g.DrawLine(p, new Point(300,200), new Point(100,300));
            g.DrawLine(p, new Point(100,100), new Point(100, 300));

            
            e.Graphics.DrawImage(GroteZwarteDriehoek, 100, 1, 30, 30);

            myBrush.Dispose();
            g.Dispose();
        }
    }
}
