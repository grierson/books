#lang sicp

(define (p) (p))

(define (test x y) 
  (if (= x 0) 
      0 
      y))

(test 0 (p))

; Normal (Lazy)
; Runs as it's lazy and never evals `(p)`
; 
; Applicative (Eagar)
; Hangs as it tries to eval `(p)` which is recursive loop 