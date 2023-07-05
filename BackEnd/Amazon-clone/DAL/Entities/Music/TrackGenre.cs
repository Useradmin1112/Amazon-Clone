﻿using DAL.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Music
{
    [Table("tblTrackGenre")]
    public class TrackGenre : BaseEntity<int>
    {
        public virtual Track Track { get; set; }
        public virtual Genre Genre { get; set; }
    }
}
