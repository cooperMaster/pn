public class Eatting {
	public static void main(String[] args) {
		// boolean 吃过饭没 = 2; // 直接编译的话javac会报错
		boolean 吃过饭没 = true;
		if (吃过饭没) System.out.println("吃了");
		if (true == 吃过饭没) System.out.println("真吃了");
	}
}
