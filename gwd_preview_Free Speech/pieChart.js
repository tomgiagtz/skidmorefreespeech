
final int QUESTIONS = 11; //number of questions

int r; //number of responses
Table table;
int[][] responses;

IntDict answers;
IntDict questions;

void setup() {
  size(1000, 1500);
  background(255);
  table = loadTable("https://raw.githubusercontent.com/tomgiagtz/skidmorefreespeech/master/data.csv", "header");
  println(table.getRowCount() + " total rows in table");
  r = table.getRowCount() / QUESTIONS;
  
  questions = new IntDict();
  for (int i = 0; i < QUESTIONS - 1; i++){
    String q = table.getRow(i).getString("question");
    questions.set(q, i);
  }
  
  
  answers = new IntDict();
  answers.set("Strongly Agree", 0);
  answers.set("Agree", 1);
  answers.set("Neutral", 2);
  answers.set("Disagree", 3);
  answers.set("Strongly Disagree", 4);
  
  println(r + "responses in table");
  responses = new int[QUESTIONS][5];
  
  
  
  for (int i =0; i < table.getRowCount(); i++) {
    TableRow currRow = table.getRow(i);
    String q = currRow.getString("question");
    String a = currRow.getString("answer");
    
    //println(q);
    
    if (!q.equals("If you would like take a moment to share your opinion on free speech.")){
      //println(q + " : " + a);
      //println(questions.get(q) + ", " + answers.get(a));
      responses[questions.get(q)][answers.get(a)]++;
    } else {
      println("SKIPPED");
    }  
    
  }
  
  String[] values = questions.keyArray();
  printArray(values);
  printArray(responses[2]);
  
  
  
}

void draw() {
   noStroke();
   int diameter = 200;
   String[] q = questions.keyArray();
   for (int i = 0; i < QUESTIONS -1; i++){
     int x = width/2;
     int y = height/2;
     
     if (i % 2 == 0) {
       x = 2*width/7;
     } else {
       x = 5*width/7;
     }
     
     y = (int) map(i % 5, 0, 5, height/6 , height);
     
     
     //pieGraph(responses[i], q[i]);
     int[] angles = normalize(responses[i]);
     pieChart(diameter, angles, x, y);
   }
}

void pieGraph(int[] data, String q){
   
}

void pieChart(float diameter, int[] data, int x, int y) {
  float lastAngle = 0;
  for (int i = 0; i < data.length; i++) {
    float gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(x, y, diameter, diameter, lastAngle, lastAngle+radians(data[i]));
    lastAngle += radians(data[i]);
  }
}

int[] normalize(int[] arr) {
  int[] result = new int[arr.length];
  for (int i = 0; i < arr.length; i++) {
    result[i] = (int) map(arr[i], 0, r, 0, 360);
    
  }
  
  return result;
}



