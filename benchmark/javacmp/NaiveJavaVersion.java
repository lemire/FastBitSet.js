import java.util.*;

// this is not precise microbenchmarking, we just want a ballpark idea
public class NaiveJavaVersion {

    public static void main(String[] args) {
        BitSet b1 = new BitSet();
        BitSet b2 = new BitSet();
        for(int i = 0 ; i < 1024  ; i++) {
            b1.set(3*i+5);
            b2.set(6*i+5);
        }
        for(int k = 0; k <1000; ++k) {
            BitSet copy = (BitSet) b1.clone();
            copy.or(b2);
            if(k%10 == 0) System.gc();
        }
        for(int z = 0; z < 5; ++z) {
            System.gc();
            ArrayList<BitSet > buffer = new ArrayList<BitSet >(1000);
            long bef = System.nanoTime();
            for(int k = 0; k <1000; ++k) {
                BitSet copy = (BitSet) b1.clone();
                copy.or(b2);
                buffer.add(copy);
            }
            long aft = System.nanoTime();
            System.out.println("union (new bitset): "+ 1000* 1000 * 1000 * 1000.0/(aft-bef)+" ops/sec ");
        }
        for(int z = 0; z < 5; ++z) {
            System.gc();
            ArrayList<BitSet > buffer = new ArrayList<BitSet >(1000);
            long bef = System.nanoTime();
            for(int k = 0; k <1000; ++k) {
                BitSet copy = (BitSet) b1.clone();
                buffer.add(copy);
            }
            long aft = System.nanoTime();
            System.out.println("clone (new bitset): "+ 1000* 1000 * 1000 * 1000.0/(aft-bef)+" ops/sec ");
        }
        for(int z = 0; z < 5; ++z) {
            System.gc();
            ArrayList<BitSet > buffer = new ArrayList<BitSet >(1000);
            long bef = System.nanoTime();
            for(int k = 0; k <1000; ++k) {
                b1.or(b2);
                buffer.add(b1);
            }
            long aft = System.nanoTime();
            System.out.println("inplace union (bogus): "+ 1000* 1000 * 1000 * 1000.0/(aft-bef)+" ops/sec ");
        }



    }

}
