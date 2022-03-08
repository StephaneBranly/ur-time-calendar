/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     getP22organization.ts                              ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/03/08 20:56:36 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { DaySemesterOrganization, SemesterPlanning } from 'utils'

const getP22organization = () => {
    const semester = new SemesterPlanning('p22')
    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 7), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 8), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 9), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 10), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 11), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 12), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 14), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 15), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 16), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 17), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 18), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 19), {
            weekAlternance: 'A',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 21), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 22), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 23), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 24), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 25), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 26), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 28), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 29), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 30), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 2, 31), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 1), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 2), {
            weekAlternance: 'A',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 4), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 5), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 6), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 7), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 8), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 9), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 11), { isHoliday: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 12), { isHoliday: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 13), { isHoliday: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 14), { isHoliday: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 15), { isHoliday: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 16), { isHoliday: true })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 18), { isFerie: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 19), {
            weekAlternance: 'A',
            isExam: true,
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 20), {
            weekAlternance: 'A',
            isExam: true,
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 21), {
            weekAlternance: 'A',
            isExam: true,
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 22), {
            weekAlternance: 'A',
            isExam: true,
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 23), {
            weekAlternance: 'A',
            isExam: true,
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 25), {
            weekAlternance: 'A',
            isExam: true,
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 26), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 27), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 28), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 29), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 3, 30), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 2), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 3), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 4), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 5), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 6), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 7), {
            weekAlternance: 'A',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 9), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 10), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 11), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 12), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 13), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 14), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 16), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 17), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 18), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 19), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 20), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 21), {
            weekAlternance: 'A',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 23), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 24), {
            weekAlternance: 'B',
            becomesA: 'Jeudi',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 25), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 26), { isFerie: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 27), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 28), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 30), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 4, 31), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 1), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 2), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 3), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 4), {
            weekAlternance: 'A',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 6), { isFerie: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 7), {
            weekAlternance: 'A',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 8), {
            weekAlternance: 'A',
            becomesA: 'Lundi',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 9), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 10), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 11), {
            weekAlternance: 'B',
        })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 13), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 14), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 15), {
            weekAlternance: 'B',
        })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 16), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 17), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 18), { isExam: true })
    )

    // new week
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 20), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 21), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 22), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 23), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 24), { isExam: true })
    )
    semester.registerDay(
        new DaySemesterOrganization(new Date(2022, 5, 25), { isExam: true })
    )
    return semester
}

export default getP22organization
