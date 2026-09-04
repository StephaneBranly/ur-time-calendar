/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     getA26organisation.ts                              ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2026/09/04 00:00:00 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { parseSemester } from 'utils'

const organisation = `
    ref: a26
    starts:2026/08/24
    ends:2027/01/31

    2026/08/31-2026/08/31-x-x-x  # Semaine de rentrée : cours uniquement, pas de TD ni de TP
    2026/09/01-2026/09/05-x-x-x  # Semaine de rentrée : cours uniquement, pas de TD ni de TP

    2026/09/07-2026/09/12-A-x-x  # A1
    2026/09/14-2026/09/19-B-x-x  # B1
    2026/09/21-2026/09/26-A-x-x  # A2
    2026/09/28-2026/09/30-B-x-x  # B2
    2026/10/01-2026/10/03-B-x-x  # B2

    2026/10/05-2026/10/10-A-x-x  # A3
    2026/10/12-2026/10/14-B-x-x  # B3
    2026/10/15-2026/10/15-B-C-x  # Comutec : suspension des cours TD/TP pour tous les étudiants
    2026/10/16-2026/10/17-B-x-x  # B3

    2026/10/19-2026/10/19-B-x-Jeudi  # Le lundi 19/10 devient un jeudi B3
    2026/10/20-2026/10/24-A-M-x      # Semaine des médians (A4)

    2026/10/26-2026/10/31-A-H-x  # Vacances de la Toussaint
    2026/11/01-2026/11/01-A-H-x  # Vacances de la Toussaint

    2026/11/02-2026/11/02-A-M-x  # Lundi 2/11 : suite des médians (A4)
    2026/11/03-2026/11/07-B-x-x  # B4

    2026/11/09-2026/11/09-B-x-x         # B4
    2026/11/10-2026/11/10-A-x-Mercredi  # Le mardi 10/11 devient un mercredi A5
    2026/11/11-2026/11/11-A-C-x         # Mercredi 11 novembre férié
    2026/11/12-2026/11/14-A-x-x         # A5

    2026/11/16-2026/11/17-A-x-x  # A5
    2026/11/18-2026/11/21-B-x-x  # B5

    2026/11/23-2026/11/24-B-x-x  # B5
    2026/11/25-2026/11/28-A-x-x  # A6

    2026/11/30-2026/11/30-A-x-x  # A6
    2026/12/01-2026/12/01-A-x-x  # A6
    2026/12/02-2026/12/05-B-x-x  # B6

    2026/12/07-2026/12/08-B-x-x  # B6
    2026/12/09-2026/12/12-A-x-x  # A7

    2026/12/14-2026/12/15-A-x-x  # A7
    2026/12/16-2026/12/18-B-x-x  # B7
    2026/12/19-2026/12/31-B-H-x  # Vacances de Noël
    2027/01/01-2027/01/03-B-H-x  # Vacances de Noël

    2027/01/04-2027/01/05-B-x-x       # B7
    2027/01/06-2027/01/06-B-x-Samedi  # Le mercredi 6 janvier devient un samedi B7
    2027/01/07-2027/01/09-B-F-x       # Semaine des examens finaux
    2027/01/11-2027/01/16-B-F-x       # Semaine des examens finaux (suite)
`

const A26organisation = parseSemester(organisation, 'A26')

export default A26organisation
