
/* Class */

create table FootballClub (
id int primary key,
c_name varchar(200),
homwCourt_advantage int not null,
league enum ('ENG', 'ESP', 'GER', 'POR', 'UKR', 'BEL', 'ITA', 'FRA', 'NED', 'RUS') not null,
teamInfo int not null,
logo varchar(200)
);

create table Player (
id int primary key,
p_name varchar(200),
age int not null,
numberOnBack int not null,
attack int not null,
defence int not null,
stamina int not null,
overall int not null,
injuryResistance int not null,
foot enum ('left', 'right', 'both') not null,
`position` enum ('GK', 'Goal Keeper', 'FWD', 'Foward', 'DEF', 'Defender', 'MDF', 'Midfield') not null,
partOf int not null,
foreign key(partOf) references FootballClub(id)
on update cascade on delete no action
 );
 
create table Injury (
id int primary key,
name varchar(200) not null,
rcoveryTime int not null
 
); 

create table LineUp (
id int primary key,
attack int not null,
defence int not null,
overall int not null

);

create table TeamInformation( 
id int primary key,
formation enum ('631', '532', '541', '424', '433', '442', '451', '343', '352'),
lineup int not null,
foreign key(lineup) references LineUp(id)
on update cascade on delete no action
);

alter table FootballClub
add foreign key(teamInfo) references TeamInformation(id)
on update cascade on delete no action;


/* Association */

create table GetInjured (
startTime int not null,
has int not null,
foreign key(has) references Injury(id)
on update cascade on delete cascade,

belongsTo int not null,
foreign key(belongsTo) references Player(id)
on update cascade on delete cascade,
primary key (has,belongsTo)

);

create table PosOnField (
positionNum int not null,
has int not null,
foreign key(has) references Player(id)
on update cascade on delete cascade,

isIn int not null,
foreign key(isIn) references LineUp(id)
on update cascade on delete cascade,
primary key (has,isIn)
);

/* Cylic Denpendency */
/*
alter table FootballClub
add foreign key (id) references Player(partOf)
on update no action on delete no action;
*/