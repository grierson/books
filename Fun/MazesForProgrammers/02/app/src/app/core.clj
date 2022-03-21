(ns app.core)

(defn link [grid c1 c2]
  (-> grid
      (update-in c1 #(conj % c2))
      (update-in c2 #(conj % c1))))

(defn unlink [grid c1 c2]
  (-> grid
      (update-in c1 (fn [coll] (disj coll c2)))
      (update-in c2 (fn [coll] (disj coll c1)))))

(defn linked? [grid c1 c2]
  (contains? (get-in grid c1) c2))

(comment
  (link [[#{} #{}]] [0 0] [0 1])
  (unlink [[#{[0 1]} #{[0 0]}]] [0 0] [0 1])
  (linked? [[#{[0 1]} #{[0 0]}]] [0 0] [0 1]))

